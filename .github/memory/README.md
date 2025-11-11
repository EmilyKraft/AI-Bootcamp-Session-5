# Working Memory System

## Purpose

This directory implements a **working memory system** for tracking patterns, decisions, and lessons learned during development. It helps maintain context across development sessions and enables better collaboration between developers and AI coding assistants.

## Why Working Memory Matters

During iterative development (especially TDD workflows), you discover:
- **Patterns**: Recurring code structures and solutions
- **Decisions**: Why certain approaches were chosen over alternatives
- **Gotchas**: Common pitfalls and how to avoid them
- **Context**: Domain knowledge that isn't obvious from code alone

Without a memory system, these insights are lost between sessions. With it, every session builds on previous learnings.

## Memory Types

This project uses two complementary memory systems:

### 1. Persistent Memory (`.github/copilot-instructions.md`)
- **Purpose**: Foundational principles, workflows, and coding standards
- **Scope**: Project-wide guidelines that rarely change
- **Examples**: TDD workflow, testing philosophy, commit conventions
- **Lifecycle**: Updated infrequently, carefully reviewed
- **Committed**: Yes, always in version control

### 2. Working Memory (`.github/memory/`)
- **Purpose**: Session-specific discoveries and evolving patterns
- **Scope**: Tactical findings, decisions, and accumulated learnings
- **Examples**: Bug fixes, API design decisions, implementation patterns
- **Lifecycle**: Updated frequently during development
- **Committed**: Partially (see structure below)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed)
- **What**: Summaries of completed development sessions
- **When**: Updated at END of session
- **Content**: Accomplishments, key findings, decisions, outcomes
- **Purpose**: Historical record for future reference
- **Committed**: Yes - provides context for future developers

#### `patterns-discovered.md` (Committed)
- **What**: Documented code patterns and solutions
- **When**: Updated when pattern is validated and reusable
- **Content**: Pattern name, context, problem, solution, examples
- **Purpose**: Knowledge base of proven approaches
- **Committed**: Yes - shared team knowledge

#### `scratch/working-notes.md` (NOT Committed)
- **What**: Real-time notes during active development
- **When**: Updated continuously during session
- **Content**: Current task, approach, findings, blockers, next steps
- **Purpose**: Working memory for current session
- **Committed**: No - ephemeral working space

## When to Use Each File

### During TDD Workflow

**Starting a new test (RED phase):**
1. Update `scratch/working-notes.md` → Current Task: "Implement POST /api/todos endpoint"
2. Note expected behavior from test

**Implementing code (GREEN phase):**
1. Update `scratch/working-notes.md` → Approach: "Using array push, auto-incrementing ID"
2. Document any unexpected behaviors in Key Findings

**Refactoring:**
1. Update `scratch/working-notes.md` → Decisions Made: "Extracted ID generation to separate function"
2. If pattern is reusable, add to `patterns-discovered.md`

**Test passes:**
1. Update `scratch/working-notes.md` → Next Steps: "Move to validation test"

### During Linting Workflow

**Before fixing errors:**
1. Update `scratch/working-notes.md` → Current Task: "Fix ESLint errors in app.js"
2. Note error categories found

**While fixing:**
1. Document decisions: "Removed console.logs, using proper logger instead"
2. Note any non-obvious fixes for future reference

**After clean lint:**
1. If you discovered a useful pattern, add to `patterns-discovered.md`

### During Debugging Workflow

**When bug is discovered:**
1. Update `scratch/working-notes.md` → Current Task: "Debug toggle always returning true"
2. Document symptoms

**During investigation:**
1. Update Key Findings: "Toggle uses assignment instead of negation"
2. Note root cause when found

**After fix:**
1. Update Decisions Made: "Changed `todo.completed = true` to `!todo.completed`"
2. If bug reveals a pattern, add to `patterns-discovered.md`

### End of Session

**Summarize your work:**
1. Review `scratch/working-notes.md`
2. Extract key findings → Add summary to `session-notes.md`
3. Extract validated patterns → Add to `patterns-discovered.md`
4. Clear or archive `scratch/working-notes.md` for next session

## How AI Uses This Memory System

When you ask Copilot for help, it can:

1. **Read session-notes.md** to understand:
   - What's already been implemented
   - Past decisions and rationale
   - Known issues or workarounds

2. **Read patterns-discovered.md** to:
   - Apply proven patterns consistently
   - Avoid repeating past mistakes
   - Suggest solutions based on project-specific patterns

3. **Read scratch/working-notes.md** to:
   - Understand current context
   - See what you've already tried
   - Pick up where you left off

4. **Write to scratch/working-notes.md** to:
   - Track progress during complex tasks
   - Document decisions made during implementation
   - Maintain continuity across tool invocations

## Best Practices

### DO ✅
- **Update scratch/working-notes.md continuously** during active development
- **Be specific** in notes: "Changed ID from UUID to auto-increment because tests expect numbers"
- **Document "why"** not just "what": "Used findIndex instead of find to get array position for splice"
- **Review memory files** before starting new work
- **Summarize sessions** into session-notes.md at natural breakpoints
- **Extract patterns** when you solve something that might recur
- **Keep scratch/ ephemeral** - it's for active work, not permanent storage

### DON'T ❌
- **Don't commit scratch/** - it's for working memory only
- **Don't duplicate** - if it's in copilot-instructions.md, don't repeat in memory/
- **Don't over-document** - focus on non-obvious insights
- **Don't skip summarization** - scratch notes lose value quickly without synthesis
- **Don't delete history** - session-notes.md is your learning archive

## Example Workflow

**Starting work:**
```
1. Read session-notes.md → See what was accomplished last time
2. Read patterns-discovered.md → Understand established patterns
3. Open scratch/working-notes.md → Start fresh notes for today
```

**During work:**
```
1. Update Current Task before each new step
2. Document findings as you discover them
3. Note decisions and rationale in real-time
4. Track blockers immediately
```

**Ending work:**
```
1. Review scratch/working-notes.md
2. Add session summary to session-notes.md
3. Extract any new patterns to patterns-discovered.md
4. Clear or archive scratch/working-notes.md
5. Commit session-notes.md and patterns-discovered.md
```

## Integration with Development Workflows

This memory system complements the workflows in `.github/copilot-instructions.md`:

- **TDD Workflow**: Track which tests pass, implementation decisions
- **Code Quality Workflow**: Document lint fixes and rationale
- **Integration Workflow**: Note integration issues and solutions
- **Debugging Workflow**: Capture root causes and fixes

The memory system doesn't replace your code or tests—it captures the **context** and **reasoning** that code alone can't express.

## Success Indicators

You're using the memory system effectively when:

- ✅ You can resume work quickly by reading session-notes.md
- ✅ Copilot suggests solutions consistent with your patterns
- ✅ You avoid repeating past mistakes
- ✅ New team members can understand past decisions
- ✅ You catch yourself referencing patterns-discovered.md
- ✅ Your scratch/working-notes.md helps you stay focused

---

**Remember**: The goal is to build institutional knowledge that persists beyond individual sessions, making each development cycle faster and more informed than the last.
