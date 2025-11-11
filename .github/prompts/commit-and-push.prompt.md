---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and Push Changes

You are analyzing the current changes, generating a conventional commit message, and pushing to a feature branch.

## Input Collection

**Branch name** (REQUIRED): ${input:branch-name}

## Instructions

### 1. Validate Branch Name

- If no branch name was provided in the input, **STOP** and ask the user to provide a branch name
- Branch name should follow format: `feature/<descriptive-name>` or `fix/<descriptive-name>`
- Examples: `feature/add-delete-endpoint`, `fix/toggle-bug`

### 2. Analyze Current Changes

Get a summary of all changes:
```bash
git status
git diff
```

Review:
- Which files were modified
- What changes were made
- Whether changes are related (single logical unit)

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following the **Conventional Commits** format:

**Format**: `type: description`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without behavior changes
- `chore:` - Maintenance tasks, dependency updates
- `docs:` - Documentation changes
- `style:` - Code style/formatting changes

**Examples**:
```
feat: add DELETE endpoint for todos
fix: resolve toggle always returning true bug
test: add validation tests for POST endpoint
refactor: extract findTodoById helper function
chore: fix ESLint errors in app.js
```

**Guidelines**:
- Keep description concise (50 chars or less ideally)
- Use present tense ("add" not "added")
- Don't capitalize first letter after colon
- No period at the end
- Focus on WHAT changed, not HOW (details are in the diff)

### 4. Create or Switch to Branch

**IMPORTANT**: Never commit to `main` or any branch other than the user-specified branch.

Check if branch exists:
```bash
git branch --list <branch-name>
```

If branch does NOT exist:
```bash
git checkout -b <branch-name>
```

If branch exists:
```bash
git checkout <branch-name>
```

### 5. Stage All Changes

```bash
git add .
```

Verify what will be committed:
```bash
git status
```

### 6. Commit with Generated Message

```bash
git commit -m "<generated-message>"
```

Example:
```bash
git commit -m "feat: implement POST /api/todos endpoint"
```

### 7. Push to Remote Branch

```bash
git push origin <branch-name>
```

If this is the first push to a new branch, Git will automatically set up tracking.

### 8. Report Success

Inform the user:
- What commit message was used
- Which branch was committed to
- That changes were pushed successfully
- Remind them they can create a PR if ready to merge

## Example Workflow

```
Input: branch-name = "feature/add-delete-endpoint"

Analyzing changes...
git status shows:
- Modified: packages/backend/src/app.js
- Modified: packages/backend/__tests__/app.test.js

git diff shows:
- Added DELETE /api/todos/:id endpoint
- Added tests for delete functionality

Generated commit message:
"feat: add DELETE endpoint for todos"

Creating branch...
git checkout -b feature/add-delete-endpoint
Switched to a new branch 'feature/add-delete-endpoint'

Staging changes...
git add .

Committing...
git commit -m "feat: add DELETE endpoint for todos"
[feature/add-delete-endpoint a1b2c3d] feat: add DELETE endpoint for todos
 2 files changed, 45 insertions(+), 2 deletions(-)

Pushing...
git push origin feature/add-delete-endpoint
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
To github.com:user/repo.git
 * [new branch]      feature/add-delete-endpoint -> feature/add-delete-endpoint

---

✅ Success!

Committed with message: "feat: add DELETE endpoint for todos"
Branch: feature/add-delete-endpoint
Pushed to remote: origin/feature/add-delete-endpoint

Your changes are now saved and pushed to GitHub.

Next steps:
- Continue working on this branch, or
- Create a Pull Request to merge into main
```

## Error Handling

If any Git operation fails:
1. Show the error message to the user
2. Explain what went wrong
3. Suggest corrective action

Common issues:
- **Merge conflicts**: Need to resolve conflicts before committing
- **No changes to commit**: All changes already committed
- **Branch already exists**: Switch to it instead of creating new
- **Push rejected**: May need to pull first if remote has changes

## Best Practices

✅ **DO**:
- Analyze changes thoroughly before committing
- Use descriptive commit messages
- Commit to feature branches only
- Verify changes with `git status` before committing
- Push immediately after committing

❌ **DON'T**:
- Don't commit to `main` branch
- Don't commit without analyzing changes first
- Don't use vague commit messages ("update", "changes", "fix")
- Don't commit broken code (ensure tests pass first)
- Don't mix unrelated changes in one commit

## Success Indicators

You've successfully completed when:
- ✅ Changes are analyzed and understood
- ✅ Appropriate conventional commit message is generated
- ✅ Committed to the user-specified feature branch (NOT main)
- ✅ Changes are pushed to remote
- ✅ User is informed of success with clear next steps
