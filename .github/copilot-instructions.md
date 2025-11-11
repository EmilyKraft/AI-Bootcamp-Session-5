---
description: "Global instructions for the TODO application workspace - TDD practices, testing standards, and development workflows"
---

# TODO Application Development Guidelines

## Project Context

This is a full-stack TODO application with a React frontend and Express backend. The project emphasizes iterative, feedback-driven development with a strong focus on Test-Driven Development (TDD).

**Current Phase**: Backend stabilization and frontend feature completion

**Tech Stack**:
- Frontend: React with React Testing Library
- Backend: Express.js with Jest + Supertest
- Testing: Unit and integration tests only (no e2e frameworks)

## Documentation References

Before starting work, review the relevant documentation to understand the project structure and patterns:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

1. **Test-Driven Development**: Follow the Red-Green-Refactor cycle
   - Write tests FIRST (Red)
   - Implement code to pass tests (Green)
   - Refactor for quality (Refactor)

2. **Incremental Changes**: Make small, testable modifications
   - Break large features into small, verifiable steps
   - Each change should have corresponding tests
   - Commit frequently with meaningful messages

3. **Systematic Debugging**: Use test failures as guides
   - Read test output carefully
   - Identify root causes before implementing fixes
   - Verify fixes with test passes

4. **Validation Before Commit**: Ensure quality at every step
   - All tests must pass
   - No lint errors
   - Code follows project conventions

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Backend Testing
- Use Jest + Supertest for API testing
- Test HTTP endpoints, middleware, and business logic
- Mock external dependencies when appropriate

### Frontend Testing
- Use React Testing Library for component testing
- Test component behavior, user interactions, and rendering
- Follow user-centric testing practices (test what users see/do)

### Manual Testing
- Use manual browser testing for full UI verification
- Test complete user flows end-to-end in the browser

### What NOT to Use
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: Keep the lab focused on unit/integration tests without e2e complexity

## Testing Approach by Context

### Backend API Changes
**Use TRUE TDD - Test First**:
1. Write Jest tests FIRST (Red phase)
2. Run tests and watch them fail
3. Implement the feature/fix (Green phase)
4. Run tests and watch them pass
5. Refactor if needed while keeping tests green

### Frontend Component Features
**Use TRUE TDD - Test First**:
1. Write React Testing Library tests FIRST for component behavior (Red phase)
2. Run tests and watch them fail
3. Implement the component/feature (Green phase)
4. Run tests and watch them pass
5. Refactor if needed while keeping tests green
6. Follow up with manual browser testing for full UI flows

**Remember**: Test-first is not optional - it's the core methodology. Write the test before writing the implementation code.

## Workflow Patterns

### 1. TDD Workflow (Primary Development Pattern)
1. **Write/Fix Tests** - Create or update test files FIRST
2. **Run Tests** - Execute test suite and observe failures
3. **Fail** - Confirm tests fail for the right reasons (Red)
4. **Implement** - Write minimal code to pass tests
5. **Pass** - Verify tests now pass (Green)
6. **Refactor** - Improve code quality while keeping tests green

### 2. Code Quality Workflow
1. **Run Lint** - Execute linting tools to identify issues
2. **Categorize Issues** - Group errors by type/severity
3. **Fix Systematically** - Address issues one category at a time
4. **Re-validate** - Run lint again to confirm fixes

### 3. Integration Workflow
1. **Identify Issue** - Understand the problem through tests/errors
2. **Debug** - Investigate root cause systematically
3. **Test** - Write/update tests to cover the issue
4. **Fix** - Implement the solution
5. **Verify End-to-End** - Confirm fix works in full context

## Chat Mode Usage

Use specialized chat modes for focused workflows:

### `tdd-developer` Mode
Use for:
- Writing new tests (unit, integration, component)
- Implementing features following Red-Green-Refactor
- Debugging test failures
- Refactoring code with test coverage
- All TDD-related development work

### `code-reviewer` Mode
Use for:
- Addressing ESLint/lint errors
- Code quality improvements
- Reviewing code for best practices
- Ensuring coding standards compliance
- Identifying potential bugs or issues

## Memory System

This project uses a dual-memory system to maintain context across development sessions:

### Persistent Memory
- **Location**: `.github/copilot-instructions.md` (this file)
- **Purpose**: Foundational principles, workflows, and coding standards
- **Scope**: Project-wide guidelines that rarely change
- **Update Frequency**: Infrequently, with careful review

### Working Memory
- **Location**: `.github/memory/` directory
- **Purpose**: Session-specific discoveries, patterns, and evolving learnings
- **Structure**:
  - `README.md` - Explains the memory system and how to use it
  - `session-notes.md` - Historical summaries of completed sessions (committed)
  - `patterns-discovered.md` - Accumulated code patterns and solutions (committed)
  - `scratch/working-notes.md` - Active session notes (NOT committed)

### How to Use Working Memory

**During Active Development**:
1. Take real-time notes in `.github/memory/scratch/working-notes.md`
2. Document current task, approach, findings, decisions, and blockers
3. Update continuously as you work through TDD, linting, or debugging workflows

**At End of Session**:
1. Review `scratch/working-notes.md`
2. Summarize key findings into `session-notes.md`
3. Extract validated patterns into `patterns-discovered.md`
4. Clear or archive `scratch/working-notes.md` for next session

**When Providing Assistance**:
- Reference memory files when providing context-aware suggestions
- Apply patterns from `patterns-discovered.md` consistently
- Understand past decisions from `session-notes.md`
- Update `scratch/working-notes.md` during complex multi-step work

**For detailed guidance**, see `.github/memory/README.md`

## Workflow Utilities

### GitHub CLI Commands
The following GitHub CLI commands are available for workflow automation (accessible in all modes):

**List open issues**:
```bash
gh issue list --state open
```

**Get issue details**:
```bash
gh issue view <issue-number>
```

**Get issue with comments**:
```bash
gh issue view <issue-number> --comments
```

**Finding Exercise Steps**:
- The main exercise issue will have "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits
Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without behavior changes
- `chore:` - Maintenance tasks, dependency updates
- `docs:` - Documentation changes
- `style:` - Code style/formatting changes

**Examples**:
```bash
git commit -m "feat: add delete functionality to TODO items"
git commit -m "test: add unit tests for TODO creation endpoint"
git commit -m "fix: resolve duplicate TODO item bug"
```

### Branch Strategy
- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`
- **Main branch**: `main` (protected, always stable)

### Commit Process
Always follow this sequence:
1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "type: description"`
3. Push to the correct branch: `git push origin <branch-name>`

### Before Committing
Ensure:
- All tests pass (`npm test`)
- No lint errors (`npm run lint`)
- Code follows project conventions
- Commit message is descriptive and follows conventional format

## General Guidelines

- Keep code modular and maintainable
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Follow existing code patterns and conventions
- Prioritize readability over cleverness
- Ask for clarification when requirements are ambiguous
