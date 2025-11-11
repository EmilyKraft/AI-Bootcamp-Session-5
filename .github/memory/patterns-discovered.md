# Patterns Discovered

## Purpose

This file documents recurring code patterns, solutions, and best practices discovered during development. Each pattern should be:

- **Proven**: Validated through tests and real usage
- **Reusable**: Applicable in multiple contexts
- **Documented**: Clearly explained with examples

Use this as a knowledge base when implementing similar features or solving similar problems.

---

## Pattern Template

```markdown
### Pattern Name
**Context**: When does this pattern apply?
**Problem**: What problem does it solve?
**Solution**: How is it implemented?
**Example**:
```javascript
// Code example showing the pattern
```
**Related Files**: Where is this pattern used?
**Notes**: Additional considerations, gotchas, or alternatives
```

---

## Documented Patterns

### Service State Initialization (Empty Array vs Null)

**Context**: Initializing collections/arrays in service modules or stateful components

**Problem**: Arrays declared but not initialized (`let items;`) cause runtime errors when array methods are called (`Cannot read property 'push' of undefined`). However, initializing to `null` requires defensive null checks throughout the codebase.

**Solution**: Initialize arrays to empty arrays (`[]`) immediately upon declaration. This allows array methods to work immediately without null checks, and represents the correct semantic meaning (an empty collection, not the absence of a collection).

**Example**:

```javascript
// ❌ BAD - Uninitialized
let todos;
todos.push({ id: 1 }); // Error: Cannot read property 'push' of undefined

// ⚠️ OKAY - But requires null checks everywhere
let todos = null;
if (todos === null) {
  todos = [];
}
todos.push({ id: 1 }); // Works, but verbose

// ✅ GOOD - Ready to use immediately
let todos = [];
todos.push({ id: 1 }); // Works immediately
```

**Related Files**:
- `packages/backend/src/app.js` - todos array initialization
- Any service module managing collections

**Notes**:
- Use `null` when absence of data is semantically different from empty data
- Use `[]` when you always have a collection (even if empty)
- For this project, todos is always a collection, so `[]` is correct
- Same principle applies to objects: prefer `{}` over `undefined` when you always have an object

---

### Auto-Incrementing ID Generation

**Context**: Generating unique IDs for in-memory data stores without a database

**Problem**: Need to assign unique IDs to new items in an in-memory array. Could use timestamps, UUIDs, or simple counters.

**Solution**: Use a module-scoped counter that increments with each new item. Simple, predictable, and sufficient for in-memory storage.

**Example**:

```javascript
// Module-scoped state
let todos = [];
let nextId = 1;

// Creating new items
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: nextId++, // Use current value, then increment
    title: req.body.title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

**Related Files**:
- `packages/backend/src/app.js` - ID generation for todos

**Notes**:
- **Pros**: Simple, predictable, human-readable IDs
- **Cons**: Not suitable for distributed systems, IDs reset on server restart
- **Alternatives**:
  - UUIDs: Better for distributed systems, but harder to read/debug
  - Timestamps: Not guaranteed unique if operations happen quickly
  - Database auto-increment: Would be used in production with real DB
- For this learning project, simple counter is ideal
- ID starts at 1 (not 0) for better human readability

---

<!-- Add new patterns below this line -->

### Boolean Toggle Pattern

**Context**: Implementing toggle functionality for boolean properties (completed/incomplete, on/off, visible/hidden)

**Problem**: Need to flip a boolean value between true and false. Common bug is to always set to a fixed value instead of toggling.

**Solution**: Use the logical NOT operator (`!`) to toggle: `property = !property`. This flips true to false and false to true.

**Example**:

```javascript
// ❌ BAD - Always sets to true (doesn't toggle)
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = true; // BUG: Always true, never toggles back
  res.json(todo);
});

// ✅ GOOD - Toggles between true and false
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed; // Flips the value
  res.json(todo);
});
```

**Related Files**:
- `packages/backend/src/app.js` - PATCH /api/todos/:id/toggle endpoint

**Notes**:
- The `!` operator is the logical NOT - it returns the opposite boolean value
- This pattern works for any boolean property
- Always test both directions (false→true and true→false) to catch toggle bugs
- Common mistake: using `= true` or `= false` instead of `= !property`

---

### Array Item Removal by ID

**Context**: Removing items from an array when you have an ID but not the index

**Problem**: Need to find and remove an item from an array by its ID. Simply finding the item gives you a reference, not the array position needed for removal.

**Solution**: Use `findIndex()` to get the array position, check if found (index !== -1), then use `splice()` to remove the item.

**Example**:

```javascript
// ❌ BAD - find() gives you the object, not the position
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  todos.splice(todo, 1); // BUG: splice needs index, not object
});

// ✅ GOOD - findIndex() gives you the position
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});
```

**Related Files**:
- `packages/backend/src/app.js` - DELETE /api/todos/:id endpoint

**Notes**:
- `findIndex()` returns -1 when item not found (not undefined or null)
- `splice(index, 1)` removes 1 item at the given index and returns an array of removed items
- `splice(index, 1)[0]` gets the first (only) removed item
- Always check `index !== -1` before using splice to avoid removing wrong items
- Alternative: `filter()` creates a new array without mutation: `todos = todos.filter(t => t.id !== id)`

---
