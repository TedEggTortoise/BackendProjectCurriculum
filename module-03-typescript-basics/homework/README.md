# Module 03 Homework: Converting JavaScript to TypeScript

## Assignment Overview

Convert the JavaScript task manager from Module 2 to TypeScript by adding comprehensive type annotations throughout the codebase. This homework demonstrates how TypeScript improves code quality and catches potential bugs.

**Estimated Time:** 2-3 hours
**Difficulty:** ⭐⭐ Intermediate

## Learning Objectives

By completing this homework, you will:

- Convert a complete JavaScript application to TypeScript
- Define interfaces for data structures
- Add type annotations to all functions
- Experience how TypeScript catches bugs
- Understand the benefits of type safety in real code

## Requirements

### Core Requirements

- [ ] Define a `Task` interface with all necessary properties
- [ ] Define a `TaskManager` interface (or class) for the manager object
- [ ] Add type annotations to all function parameters
- [ ] Add return type annotations to all functions
- [ ] Handle optional properties correctly
- [ ] Ensure the code compiles with no TypeScript errors
- [ ] All existing functionality continues to work

### Type Safety Requirements

- [ ] No use of `any` type (except where explicitly allowed)
- [ ] All arrays are properly typed
- [ ] All object properties are defined in interfaces
- [ ] Null/undefined cases are handled with union types
- [ ] Function return types match their actual returns

### File Requirements

Your homework should include:

- `types.ts` - Interface definitions
- `index.ts` - Main application logic with type annotations
- `tsconfig.json` - TypeScript configuration (provided)
- `package.json` - Dependencies (provided)

## Getting Started

1. Navigate to the homework folder:

```bash
cd module-03-typescript-basics/homework/starter
```

2. Install dependencies:

```bash
npm install
```

3. Review the starter code and TODO comments

4. Complete each TODO section in order

## Project Structure

```
homework/
├── README.md (this file)
├── starter/
│   ├── index.ts          # Main application (add types here)
│   ├── types.ts          # Interface definitions (define interfaces here)
│   ├── tsconfig.json     # TypeScript configuration
│   └── package.json      # Dependencies
└── tests/
    └── homework.test.ts  # Test suite
```

## Running Your Code

### Compile TypeScript

```bash
npm run build
```

### Run the compiled code

```bash
npm start
```

### Compile and run in one step

```bash
npm run dev
```

### Run tests

```bash
npm test
```

Or run just the Module 3 tests:

```bash
npm run test:module-03
```

## Detailed Requirements

### 1. Task Interface

Define a `Task` interface in `types.ts` with these properties:

- `id` (number) - Unique identifier
- `title` (string) - Task description
- `completed` (boolean) - Whether task is done
- `createdAt` (string) - ISO date string when task was created
- `completedAt` (string, optional) - ISO date string when task was completed

### 2. TaskManager Interface

Define a `TaskManager` interface with:

- `tasks` (array of Task objects)
- Any other properties you need for the manager

Or alternatively, you can define a TaskManager as a class with typed properties and methods.

### 3. Function Type Annotations

Add complete type annotations to all functions:

- `createTask(title: string): Task`
- `getTasks(): Task[]`
- `getTaskById(id: number): Task | null`
- `updateTask(id: number, updates: Partial<Task>): boolean`
- `deleteTask(id: number): boolean`
- `toggleComplete(id: number): boolean`
- And any helper functions you create

### 4. Array and Object Typing

Ensure all arrays and objects are properly typed:

```typescript
// Good
const tasks: Task[] = [];

// Bad
const tasks = []; // Type 'any[]'
```

## Example Solution Structure

Your `types.ts` should look something like:

```typescript
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface TaskManager {
  tasks: Task[];
  nextId: number;
}
```

Your `index.ts` should use these types:

```typescript
import { Task, TaskManager } from './types';

const manager: TaskManager = {
  tasks: [],
  nextId: 1,
};

function createTask(title: string): Task {
  const task: Task = {
    id: manager.nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  manager.tasks.push(task);
  return task;
}

// ... more functions
```

## Testing Your Work

The test suite checks:

1. **Compilation** - Your code compiles with no TypeScript errors
2. **Interface Definitions** - Task and TaskManager interfaces exist and are correct
3. **Type Annotations** - Functions have proper parameter and return types
4. **No Any Types** - You're not using `any` to bypass type checking
5. **Functionality** - All features work correctly

Run the tests frequently as you work:

```bash
npm test
```

## Common Challenges

### Challenge 1: Optional Properties

Use `?` for properties that might not exist:

```typescript
interface Task {
  completedAt?: string; // Might not have a value
}
```

### Challenge 2: Null Returns

When a function might not find something, use union types:

```typescript
function findTask(id: number): Task | null {
  return tasks.find((t) => t.id === id) || null;
}
```

### Challenge 3: Partial Updates

Use TypeScript's `Partial<T>` utility type for update functions:

```typescript
function updateTask(id: number, updates: Partial<Task>): boolean {
  // updates can contain any subset of Task properties
}
```

## Tips for Success

1. **Start with interfaces** - Define your types in `types.ts` first
2. **Add types incrementally** - Don't try to do everything at once
3. **Read error messages** - TypeScript errors are helpful, not scary
4. **Use type inference** - Let TypeScript infer when obvious
5. **Test frequently** - Run `npm test` after each section

## Submission Checklist

Before considering this homework complete:

- [ ] All TODO comments are addressed
- [ ] Code compiles with no TypeScript errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] No `any` types used (except where allowed)
- [ ] All functions have parameter and return types
- [ ] Task and TaskManager interfaces are complete
- [ ] Optional properties use `?` correctly
- [ ] Code is properly formatted

## Bonus Challenges

If you finish early and want extra practice:

1. **Add Priority** - Add a priority property to tasks ("low", "medium", "high")
2. **Add Tags** - Add a tags array to tasks
3. **Add Filtering** - Create a function to filter tasks by completion status
4. **Add Sorting** - Create a function to sort tasks by date
5. **Add Validation** - Create functions to validate task data

## Getting Help

If you're stuck:

1. Review the lessons in this module
2. Check the [TypeScript Cheatsheet](../../../resources/cheatsheets/typescript-reference.md)
3. Look at [Common TypeScript Errors](../../../resources/common-errors.md#module-3-typescript)
4. Ask for help during office hours

## What's Next?

After completing this homework:

- Make sure all tests pass
- Review any areas you found challenging
- Move on to [Module 04: HTTP & REST APIs](../../module-04-http-rest-apis/README.md)

Good luck! Remember, the goal is to understand how TypeScript improves code quality, not just to make the tests pass.

## Node Commands

```
npm install -g ts-node
ts-node index.ts

# Compile TypeScript to JavaScript
tsc index.ts

# Run the compiled JavaScript
node index.js

npm install -g tsx
tsx index.ts
```
