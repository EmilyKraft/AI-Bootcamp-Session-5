---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute GitHub Issue Step

You are executing the current step from the main exercise GitHub Issue. Follow TDD principles and work systematically through each activity.

## Input Collection

${input:issue-number}

## Instructions

### 1. Find the Exercise Issue

If issue number was not provided:
- Use `gh issue list --state open` to find open issues
- Look for an issue with "Exercise:" in the title (this is the main exercise issue)
- Extract the issue number

If issue number was provided:
- Use the provided issue number directly

### 2. Get Issue Content with Comments

Use GitHub CLI to fetch the full issue with all comments:
```bash
gh issue view <issue-number> --comments
```

This will show:
- The main issue description
- All comment threads (each step is posted as a comment)

### 3. Parse the Latest Step Instructions

From the issue comments:
- Find the MOST RECENT step comment (steps are posted as comments chronologically)
- The step will have a clear header like "# Step 5-X: [Description]"
- Extract all content from that step comment

### 4. Execute Activities Systematically

Look for sections marked with `:keyboard: Activity:` in the step instructions.

For each activity:
- **Read carefully** what the activity asks you to do
- **Follow TDD principles** (Red-Green-Refactor) when implementing features
- **Write tests FIRST** for new features (this is core TDD methodology)
- **Run tests** after each change to verify progress
- **Fix errors systematically** as they appear
- **Document your progress** in `.github/memory/scratch/working-notes.md`

### 5. Testing Scope Constraints

**CRITICAL**: Follow the project's testing scope:

✅ **ALLOWED**:
- Jest + Supertest for backend API testing
- React Testing Library for frontend component testing
- Manual browser testing for full UI flows
- Unit tests and integration tests

❌ **PROHIBITED**:
- **DO NOT** suggest or install Playwright, Cypress, Selenium, or any e2e frameworks
- **DO NOT** suggest browser automation tools
- **NO** end-to-end test framework setup

**Reason**: This project focuses on TDD with unit/integration tests, not e2e framework complexity.

### 6. TDD Workflow Reminder

When implementing new features:
1. **RED**: Write test FIRST (watch it fail)
2. **GREEN**: Write minimal code to pass the test
3. **REFACTOR**: Improve code quality while keeping tests green
4. **REPEAT**: Move to next test case

When fixing failing tests:
1. **Analyze**: Understand why the test fails
2. **Fix**: Make minimal changes to pass
3. **Refactor**: Clean up after tests pass

### 7. Work Incrementally

- Complete one activity at a time
- Run tests frequently (`npm test`)
- Check for lint errors (`npm run lint`)
- Fix issues as they appear
- Don't move to next activity until current one is complete

### 8. Document Your Work

Update `.github/memory/scratch/working-notes.md` with:
```markdown
## Current Task
Executing Step [number]: [description]

## Activities Completed
- [x] Activity 1: [what you did]
- [ ] Activity 2: [in progress]
- [ ] Activity 3: [pending]

## Key Findings
- [Important discoveries during implementation]

## Decisions Made
- [Why you chose certain approaches]

## Tests Status
- Backend: X/Y passing
- Frontend: X/Y passing
- Lint: clean / has errors
```

### 9. DO NOT Commit or Push

**IMPORTANT**: 
- Do NOT run `git commit` or `git push`
- Do NOT create branches
- Your job is to IMPLEMENT the step activities
- Committing and pushing is handled by the `/commit-and-push` prompt

### 10. Stop and Report

After completing all activities in the step:
1. Run final validation:
   ```bash
   npm test
   npm run lint
   ```
2. Report completion status to the user
3. List any remaining issues or blockers
4. **Instruct the user** to run `/validate-step` to check success criteria

## Example Workflow

```
Found exercise issue #42: "Exercise: TODO App Implementation"

Latest step from comments:
# Step 5-1: Implement POST Endpoint

:keyboard: Activity: Implement the POST /api/todos endpoint
- Write a test for creating a todo with valid title
- Implement the endpoint to pass the test
- Add validation for missing title
- Run tests to verify

---

Executing activities:

✅ Activity 1: Write test for POST endpoint
   - Added test in __tests__/app.test.js
   - Test expects 201 status with todo object
   - Running test... FAILED (expected - endpoint not implemented)

✅ Activity 2: Implement POST endpoint
   - Added POST route in src/app.js
   - Generates ID, sets defaults
   - Running test... PASSED

✅ Activity 3: Add title validation
   - Added validation check
   - Test for missing title... PASSED

✅ Activity 4: Verify all tests
   - Running npm test... All tests passing (12/12)
   - Running npm run lint... Clean (0 errors)

---

Step 5-1 activities completed successfully!

Next steps:
1. Run /validate-step with step number "5-1" to verify success criteria
2. If validation passes, run /commit-and-push to save your work
```

## Success Indicators

You've successfully executed the step when:
- ✅ All `:keyboard: Activity:` sections are completed
- ✅ Tests are passing (npm test)
- ✅ No lint errors (npm run lint)
- ✅ Code follows TDD principles (tests written first for new features)
- ✅ Working notes are updated
- ✅ User is instructed to run /validate-step next

Remember: Focus on implementation. Let /validate-step handle validation and /commit-and-push handle Git operations.
