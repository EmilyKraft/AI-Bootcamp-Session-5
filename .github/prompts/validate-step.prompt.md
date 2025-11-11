---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate Step Success Criteria

You are validating that all success criteria for a specific exercise step have been met. Be thorough and systematic in your validation.

## Input Collection

**Step number** (REQUIRED): ${input:step-number}

Format: "5-0", "5-1", "5-2", etc.

## Instructions

### 1. Validate Input

- If step number was not provided, **STOP** and ask the user for it
- Step number should be in format: "X-Y" (e.g., "5-0", "5-1")

### 2. Find the Exercise Issue

Use GitHub CLI to find the main exercise issue:
```bash
gh issue list --state open
```

Look for an issue with "Exercise:" in the title. This is the main exercise issue containing all steps.

Extract the issue number.

### 3. Get Issue with Comments

Fetch the full issue including all comments:
```bash
gh issue view <issue-number> --comments
```

Steps are posted as individual comments on the main issue.

### 4. Find the Specified Step

Search through the issue comments to find the step matching the provided step number.

Look for a header like:
```
# Step 5-1: [Description]
```

Where "5-1" matches the input step number.

Extract the entire step content from that comment.

### 5. Extract Success Criteria

Within the step content, find the section titled "**Success Criteria**" or ":white_check_mark: Success Criteria:".

This section lists all criteria that must be met for the step to be considered complete.

Example format:
```
:white_check_mark: Success Criteria:
- [ ] All backend tests pass
- [ ] No ESLint errors
- [ ] DELETE endpoint implemented
- [ ] Proper 404 handling for invalid IDs
```

### 6. Validate Each Criterion

For each criterion in the success criteria list, check the current workspace state:

#### Common Validation Checks

**Tests passing**:
```bash
npm test
```
- Check if all tests pass
- Note any failing tests
- Count passing vs total tests

**Lint status**:
```bash
npm run lint
```
- Check for ESLint errors
- Count errors if any
- Categorize error types

**Endpoints implemented**:
- Check `packages/backend/src/app.js` for route definitions
- Verify HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Check route paths

**Error handling**:
- Look for 404 responses for invalid IDs
- Check for 400 responses for validation errors
- Verify error messages are descriptive

**Frontend features**:
- Check `packages/frontend/src/App.js` for UI components
- Look for event handlers (onClick, onChange, etc.)
- Verify state management with React Query

**Validation logic**:
- Check for input validation (required fields, empty strings, etc.)
- Verify appropriate error responses

**Code quality**:
- Check for unused variables
- Look for console.log statements (should be removed)
- Verify proper error handling

### 7. Generate Validation Report

Create a comprehensive report showing:

#### ✅ Completed Criteria
List each criterion that is fully met with a checkmark.

#### ❌ Incomplete Criteria
List each criterion that is NOT met with specific details:
- What is missing or incorrect
- What needs to be done to complete it
- Specific file locations or code sections to fix

#### ⚠️ Partial Criteria
List criteria that are partially complete with:
- What's working
- What still needs work

### 8. Provide Next Steps

Based on the validation results:

**If ALL criteria are met**:
```
🎉 All success criteria for Step ${step-number} are met!

You can now:
1. Run /commit-and-push to save your work to a feature branch
2. Move on to the next step in the exercise
```

**If criteria are NOT met**:
```
⚠️ Step ${step-number} is not yet complete.

Incomplete items:
1. [Specific criterion]: [What needs to be done]
2. [Specific criterion]: [What needs to be done]

Recommended actions:
- Fix [specific issue] in [specific file]
- Run npm test to verify [specific tests]
- Check [specific functionality] in the browser

After addressing these items, run /validate-step again.
```

## Example Workflow

```
Input: step-number = "5-1"

Finding exercise issue...
gh issue list shows issue #42: "Exercise: TODO App Implementation"

Getting issue with comments...
gh issue view 42 --comments

Finding Step 5-1...
Located in comment #3:

# Step 5-1: Implement POST Endpoint

**Success Criteria**:
- [ ] POST /api/todos endpoint implemented
- [ ] Returns 201 status with created todo
- [ ] Auto-generates unique ID
- [ ] Validates required title field
- [ ] Returns 400 for missing/empty title
- [ ] All backend tests passing
- [ ] No ESLint errors

---

Validating criteria...

✅ POST /api/todos endpoint implemented
   - Found in packages/backend/src/app.js line 45
   - Route handler defined correctly

✅ Returns 201 status with created todo
   - Verified in code: res.status(201).json(todo)
   - Test passing: "should create a new todo with valid title"

✅ Auto-generates unique ID
   - nextId counter implemented
   - Increments on each POST
   - Test passing: "should auto-generate unique IDs"

✅ Validates required title field
   - Check for !title implemented
   - Returns 400 when missing

❌ Returns 400 for empty title
   - Missing validation for empty string
   - Need to add: if (!title || title.trim() === '')
   - Test failing: "should return 400 for empty title"

✅ Backend tests status: 11/12 passing
   - 1 test failing (empty title validation)

✅ No ESLint errors
   - npm run lint shows 0 errors

---

VALIDATION RESULT: Step 5-1 is INCOMPLETE

Completed (5/7):
✅ POST endpoint implemented
✅ Returns 201 with created todo
✅ Auto-generates unique ID
✅ Validates missing title
✅ No ESLint errors

Incomplete (2/7):
❌ Empty title validation missing
   - Location: packages/backend/src/app.js, POST /api/todos route
   - Fix: Change validation to: if (!title || title.trim() === '')
   - Test to pass: "should return 400 for empty title"

⚠️ Not all tests passing
   - Status: 11/12 passing
   - Failing: Empty title validation test
   - Will pass once empty string validation is added

Next steps:
1. Add empty string validation to POST endpoint
2. Run: npm test -- --testNamePattern="empty title"
3. Verify test passes
4. Run /validate-step "5-1" again to confirm completion
```

## Edge Cases

### Step Not Found
If the specified step doesn't exist in the issue:
```
❌ Could not find Step ${step-number} in the exercise issue.

Available steps found:
- Step 5-0: Setup and Prerequisites
- Step 5-1: Implement POST Endpoint
- Step 5-2: Implement DELETE Endpoint

Please verify the step number and try again.
```

### No Success Criteria Section
If the step doesn't have a clear success criteria section:
```
⚠️ Step ${step-number} was found but has no explicit success criteria section.

Based on the step instructions, here's what appears to be required:
[Infer from activity sections]

Validating against inferred criteria...
```

## Success Indicators

You've successfully validated when:
- ✅ Step was located in the issue
- ✅ Success criteria were extracted
- ✅ Each criterion was checked against workspace state
- ✅ Clear report generated showing status
- ✅ Specific guidance provided for incomplete items
- ✅ Next steps are clear to the user

Remember: Be thorough but helpful. The goal is to guide the developer toward completion, not just report failures.
