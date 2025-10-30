/**
 * Module 02 Homework - Todo CLI Application
 *
 * This is a command-line todo list manager that stores todos in a JSON file.
 * Your task is to implement the TODO sections throughout this file.
 *
 * Usage:
 *   node index.js list [all|active|completed]  - List todos
 *   node index.js add "Todo title"             - Add a new todo
 *   node index.js complete <id>                - Mark a todo as completed
 *   node index.js delete <id>                  - Delete a todo
 */

const fs = require('fs').promises;
const path = require('path');

// Path to the data file where todos are stored
const DATA_FILE = path.join(__dirname, 'data.json');

/**
 * Load todos from the JSON file
 * @returns {Promise<Array>} Array of todo objects
 */
async function loadTodos() {
  // TODO: Implement loading todos from DATA_FILE
  // 1. Read the file using fs.promises.readFile()
  // 2. Parse the JSON content
  // 3. Return the parsed array
  // 4. Handle the case where the file doesn't exist (return empty array)
  // Hint: You can use try/catch to handle file not found errors
  try {
    const jsonString = await fs.readFile(DATA_FILE);
    const jsonArray = JSON.parse(jsonString);
    return jsonArray;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    console.error('Error loading todos:', error.message);
    return [];
  }
}

/**
 * Save todos to the JSON file
 * @param {Array} todos - Array of todo objects to save
 * @returns {Promise<void>}
 */
async function saveTodos(todos) {
  // TODO: Implement saving todos to DATA_FILE
  // 1. Convert the todos array to JSON string with pretty formatting
  //    Use JSON.stringify(todos, null, 2) for readable output
  const jsonString = JSON.stringify(todos, null, 2);

  // 2. Write the JSON string to DATA_FILE using fs.promises.writeFile()
  try {
    await fs.writeFile(DATA_FILE, jsonString);
  } catch (error) {
    console.error('Error saving todos:', error.message);
  }
  // Hint: Make sure to await the writeFile call
  // Placeholder - add your implementation here
}

/**
 * Generate a unique ID for a new todo
 * @param {Array} todos - Existing todos array
 * @returns {number} A unique ID
 */
function generateId(todos) {
  // TODO: Implement ID generation
  // 1. If todos array is empty, return 1
  if (todos.length === 0) {
    return 1;
  }

  // 2. Otherwise, find the maximum ID in the existing todos
  const maxID = todos.reduce((max, todo) => {
    return Math.max(max, todo.id);
  }, 0);

  // 3. Return max ID + 1
  return maxID + 1;
  // Hint: Use Math.max() with map() to find the highest ID
}

/**
 * List todos, optionally filtered by status
 * @param {string} filter - 'all', 'active', or 'completed'
 */
async function listTodos(filter = 'all') {
  // TODO: Implement listing todos
  // 1. Load todos using loadTodos()
  // 2. Filter todos based on the filter parameter:
  //    - 'all': show all todos
  //    - 'active': show only todos with status === 'active'
  //    - 'completed': show only todos with status === 'completed'
  // 3. Display the filtered todos in a readable format
  //    Example: "[1] Buy groceries (active) - Created: 2025-01-15"
  // 4. If no todos match, display a helpful message

  const todos = await loadTodos();

  let filteredTodos = null;
  if (filter === 'all') {
    filteredTodos = todos;
  } else if (filter === 'active') {
    filteredTodos = todos.filter((todo) => todo.status === 'active');
  } else if (filter === 'completed') {
    filteredTodos = todos.filter((todo) => todo.status === 'completed');
  } else {
    console.log('node index.js list [all|active|completed]  - List todos');
    return;
  }

  let index = 1;
  for (todo of filteredTodos) {
    const date = new Date(todo.createdAt).toISOString().slice(0, 10);
    console.log(`[${index}] ${todo.title} (${todo.status}) - Created: ${date}`);
    index++;
  }
}

/**
 * Add a new todo
 * @param {string} title - Title of the new todo
 */
async function addTodo(title) {
  // TODO: Implement adding a todo
  // 1. Validate that title is provided and not empty
  //    If invalid, display an error and return
  if (title === null || title === undefined || title.trim() === '') {
    console.log('node index.js add "Todo title" - Add a new todo');
    return;
  }

  // 2. Load existing todos
  let todos = await loadTodos();

  // 3. Create a new todo object with:
  //    - id: generated using generateId()
  //    - title: the provided title (trimmed)
  //    - status: 'active'
  //    - createdAt: current timestamp (use new Date().toISOString())
  let todo = {
    id: generateId(todos),
    title: title.trim(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  // 4. Add the new todo to the array
  todos.push(todo);

  // 5. Save the updated todos array
  saveTodos(todos);

  // 6. Display a success message with the new todo's ID
  console.log(`Success - Todo ID = ${todo.id}`);
}

/**
 * Mark a todo as completed
 * @param {number} id - ID of the todo to complete
 */
async function completeTodo(id) {
  // TODO: Implement completing a todo
  // 1. Parse the id to a number
  const todoID = parseInt(id, 10);
  if (isNaN(todoID)) {
    console.error('Invalid ID', id);
    return;
  }

  // 2. Load existing todos
  const todos = await loadTodos();

  // 3. Find the todo with the matching ID
  //    If not found, display an error and return
  const finds = todos.filter((todo) => todo.id === todoID);
  if (finds.length === 0) {
    console.log('Did not find todo with ID', id);
    return;
  }

  // 4. Update the todo's status to 'completed'
  finds[0].status = 'completed';

  // 5. Save the updated todos array
  await saveTodos(todos);

  // 6. Display a success message
  console.log('Success - Completed Todo with ID: ', id);
}

/**
 * Delete a todo
 * @param {number} id - ID of the todo to delete
 */
async function deleteTodo(id) {
  // TODO: Implement deleting a todo
  // 1. Parse the id to a number
  const todoID = parseInt(id, 10);
  if (isNaN(todoID)) {
    console.error('Invalid ID', id);
    return;
  }

  // 2. Load existing todos
  let todos = await loadTodos();

  // 3. Find the index of the todo with the matching ID
  //    If not found, display an error and return
  const finds = todos.filter((todo) => todo.id === todoID);
  if (finds.length === 0) {
    console.log('Did not find todo with ID', id);
    return;
  }

  // 4. Remove the todo from the array
  //    Hint: Use array.splice() or array.filter()
  todos = todos.filter((todo) => todo.id != id);

  // 5. Save the updated todos array
  await saveTodos(todos);

  // 6. Display a success message
  console.log('Success - Deleted Todo with ID: ', id);
}

/**
 * Main function - parses command line arguments and calls the appropriate handler
 */
async function main() {
  // Parse command line arguments
  // process.argv contains: [node_path, script_path, command, ...args]
  const [, , command, ...args] = process.argv;

  try {
    // Route to the appropriate command handler
    switch (command) {
      case 'list':
        await listTodos(args[0] || 'all');
        break;

      case 'add':
        await addTodo(args.join(' '));
        break;

      case 'complete':
        await completeTodo(args[0]);
        break;

      case 'delete':
        await deleteTodo(args[0]);
        break;

      default:
        // Display usage instructions if command is not recognized
        console.log('Todo CLI Application');
        console.log('');
        console.log('Usage:');
        console.log('  node index.js list [all|active|completed]  - List todos');
        console.log('  node index.js add "Todo title"             - Add a new todo');
        console.log('  node index.js complete <id>                - Mark a todo as completed');
        console.log('  node index.js delete <id>                  - Delete a todo');
        console.log('');
        console.log('Examples:');
        console.log('  node index.js add "Buy groceries"');
        console.log('  node index.js list active');
        console.log('  node index.js complete 1');
    }
  } catch (error) {
    // Handle any errors that occur during execution
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
