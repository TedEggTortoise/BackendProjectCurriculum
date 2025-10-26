// Exercise 4: Async/Await Practice
// Complete all TODO sections

const fs = require('fs').promises;
const { time } = require('console');
const path = require('path');
const { dateTimestampProvider } = require('rxjs/internal/scheduler/dateTimestampProvider');

// ========================================
// 1. Promise Basics
// ========================================

// TODO: Create a function that returns a Promise
// If the input number is positive, resolve with "Positive: {number}"
// If negative, reject with "Negative numbers not allowed"
const checkPositive = (num) => {
  return new Promise((resolve, reject) => {
    if (num > 0) {
      resolve(`Positive: ${num}`);
    } else {
      reject('Negative numbers not allowed');
    }
  });
};

// TODO: Create a delay function that resolves after a given number of milliseconds
// This is useful for simulating async operations
// Example: await delay(1000) waits for 1 second
const delay = (ms) => {
  // Your code here - return a Promise that resolves after ms milliseconds
  // Hint: Use setTimeout inside the Promise

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// TODO: Create a function that simulates fetching user data
// After 500ms, resolve with an object: { id, name, age }
const fetchUser = async (id) => {
  // Your code here - use delay and return user data

  await delay(500);

  return { id: id, name: 'Ted', age: 14 };
};

// ========================================
// 2. Using Promises with .then() and .catch()
// ========================================

// TODO: Create a function that uses .then() to handle the checkPositive Promise
// Return "Success: {result}" if positive, "Error: {error}" if negative
const handleCheckPositive = (num) => {
  // Your code here - use .then() and .catch()

  return checkPositive(num)
    .then((result) => `Success: ${result}`)
    .catch((error) => `Error: ${error}`);
};

// TODO: Chain multiple Promises together
// 1. Fetch user with id
// 2. After getting user, return a string "User {name} is {age} years old"
// Use .then() chaining (not async/await)
const getUserInfo = (id) => {
  // Your code here - use .then() chaining

  return fetchUser(id).then((user) => `User ${user.name} is ${user.age} years old`);
};

// ========================================
// 3. Async/Await Basics
// ========================================

// TODO: Convert handleCheckPositive to use async/await instead of .then()
// Use try/catch for error handling
const handleCheckPositiveAsync = async (num) => {
  // Your code here - use async/await with try/catch

  return await handleCheckPositive(num);
};

// TODO: Convert getUserInfo to use async/await instead of .then()
const getUserInfoAsync = async (id) => {
  // Your code here - use async/await

  return await getUserInfo(id);
};

// TODO: Create an async function that waits 1 second then returns a greeting
// Use the delay function you created earlier
const asyncGreeting = async (name) => {
  await delay(1000);
  return `Hello ${name}!`;
};

// ========================================
// 4. Reading Files Asynchronously
// ========================================

// TODO: Read a file asynchronously and return its contents
// Use async/await and proper error handling
// Hint: Use fs.readFile() from the fs.promises module
const readFileAsync = async (filePath) => {
  return await fs.readFile(filePath);
};

// TODO: Read the data.json file from the previous exercise
// Parse it and return the JavaScript object
// Path: '../03-objects-json/data.json'
const loadStudentData = async () => {
  // Your code here
  // 1. Build the correct file path
  // 2. Read the file
  // 3. Parse the JSON
  // 4. Return the object

  const filePath = path.join(__dirname, '../03-objects-json/data.json');
  const jsonString = await readFileAsync(filePath);
  const jsonObj = JSON.parse(jsonString);
  return jsonObj;
};

// TODO: Read a file that might not exist
// Return the contents if it exists, or "File not found" if it doesn't
// Don't let the error crash the program
const safeReadFile = async (filePath) => {
  // Your code here - use try/catch to handle the error

  try {
    return await readFileAsync(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return 'File not found';
    }

    return 'Other errors';
  }
};

// ========================================
// 5. Writing Files Asynchronously
// ========================================

// TODO: Write data to a file asynchronously
// Convert the data to JSON with 2-space indentation
const writeJSONFile = async (filePath, data) => {
  // Your code here
  // 1. Convert data to JSON string
  // 2. Write to file using fs.writeFile()
  // 3. Return true if successful, false if error

  const jsonString = JSON.stringify(data);
  try {
    await fs.writeFile(filePath, jsonString);
    return true;
  } catch {
    return false;
  }
};

// TODO: Append a message to a log file
// Create the file if it doesn't exist
const appendToLog = async (message) => {
  // Your code here
  const logPath = path.join(__dirname, 'activity.log');
  // Use fs.appendFile() to add the message with a timestamp

  const now = new Date();
  const messageLine = `[${now}] ${message} \n`;

  try {
    await fs.appendFile(logPath, messageLine);
    return true;
  } catch {
    return false;
  }
};

// ========================================
// 6. Parallel Async Operations
// ========================================

// TODO: Fetch multiple users in parallel using Promise.all()
// Return an array of user objects
const fetchMultipleUsers = async (ids) => {
  // Your code here
  // Hint: Map the ids to fetchUser calls, then use Promise.all()

  const promises = ids.map((id) => fetchUser(id));

  return await Promise.all(promises);
};

// TODO: Read multiple files in parallel
// Return an object with filenames as keys and contents as values
const readMultipleFiles = async (filePaths) => {
  // Your code here
  // Use Promise.all() to read all files at once

  const promises = filePaths.map((filePath) => safeReadFile(filePath));
  const contents = await Promise.all(promises);
  let result = {};
  for (let i = 0; i < filePaths.length; i++) {
    result[filePaths[i]] = contents[i];
  }

  return result;
};

// TODO: Get the average age of all students from the data file
// This combines file reading with data processing
const getAverageStudentAge = async () => {
  // Your code here
  // 1. Load student data
  // 2. Calculate average age
  // 3. Return the average rounded to 1 decimal

  const students = await loadStudentData();
  const total = students.reduce((total, student) => student.age + total, 0);
  const average = total / student.length;
  return average.toFixed(1);
};

// ========================================
// 7. Sequential vs Parallel Operations
// ========================================

// TODO: Execute operations sequentially (one after another)
// Log timestamps to show the order
const sequentialOperations = async () => {
  // Your code here
  console.log('Starting sequential operations...');
  // Use await for each operation one at a time
  // This should take about 3 seconds total
  await delay(1000);
  console.log('Waited for 1 second');
  await delay(1000);
  console.log('Waited for 1 second');
  await delay(1000);
  console.log('Waited for 1 second');
};

// TODO: Execute operations in parallel (all at once)
// Compare the execution time with sequential
const parallelOperations = async () => {
  // Your code here
  console.log('Starting parallel operations...');
  // Use Promise.all() to run operations together
  // This should take about 1 second total

  const promises = [
    delay(1000).then(() => console.log('1')),
    delay(1000).then(() => console.log('2')),
    delay(1000).then(() => console.log('3')),
  ];

  await Promise.all(promises);
};

// ========================================
// 8. Error Handling Patterns
// ========================================

// TODO: Create a function that retries an operation up to 3 times
// If it fails 3 times, throw the error
const retryOperation = async (operation, maxRetries = 3) => {
  // Your code here
  // Use a loop to retry the operation
  // Catch errors and retry until maxRetries is reached
  for (let i = 1; i < maxRetries; i++) {
    try {
      return await operation();
    } catch {}
  }

  throw `Error after ${maxRetries} retries`;
};

// TODO: Create a function with a timeout
// If the operation takes longer than timeoutMs, reject with "Timeout"
const withTimeout = async (promise, timeoutMs) => {
  // Your code here
  // Hint: Use Promise.race() with the promise and a timeout promise

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject('Timeout'), timeoutMs);
  });

  return await Promise.race([promise, timeoutPromise]);
};

// TODO: Handle multiple operations and return results even if some fail
// Return an array of objects: { status: 'success'|'error', value|reason }
const settleAllOperations = async (promises) => {
  // Your code here
  // Hint: Use Promise.allSettled()

  return await Promise.allSettled(promises);
};

// ========================================
// 9. Real-World Async Patterns
// ========================================

// TODO: Simulate a data processing pipeline
// 1. Load student data from file
// 2. Filter students by sport
// 3. Transform the data (map to simplified objects)
// 4. Write results to a new file
const processStudentsBySport = async (sport) => {
  const data = await loadStudentData();
  const students = data.students;
  const filteredStudents = students.filter((student) => student.primarySport === sport);
  const outputJsonString = JSON.stringify(filteredStudents);

  const outputPath = path.join(__dirname, 'studentsports.json');
  await fs.writeFile(outputPath, outputJsonString, 'utf8');
};

// TODO: Create a function that processes items in batches
// Process 3 items at a time to avoid overwhelming the system
const processBatch = async (items, batchSize = 3) => {
  // Your code here
  // Process items in chunks, waiting for each batch to complete
  // before starting the next batch

  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    const batchPromises = batch.map((item) => console.log('Processed item'));

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
};

// TODO: Implement a simple cache for async operations
// If the same id is requested within 5 seconds, return cached data
// Otherwise, fetch new data
const cachedFetchUser = (() => {
  const cache = new Map();

  return async (id) => {
    // Your code here
    // Check cache for recent data
    // If found and not expired, return cached data
    // Otherwise, fetch new data and cache it
    if (cache.has(id)) {
      const cached = cache.get(id);
      if (Date.now() - cached.timestamp < 5000) {
        return cached.data;
      }
    }

    const data = await fetchUser(id);
    cache.set(id, {
      data,
      timestamp: Date.now(),
    });
    return data;
  };
})();

// ========================================
// 10. Combining Everything
// ========================================

const createReportCard = (student) => {
  const grade = student.attendanceRate >= 80 && student.skillLevel >= 3 ? 'A' : 'B';
  const passed = grade === 'A' || grade === 'B';

  return {
    name: student.name,
    sport: student.sport,
    grade: grade,
    passed: passed,
    feedback: passed ? 'Great job!' : 'Keep practicing!',
  };
};

// TODO: Create a complete student report system
// 1. Load all student data
// 2. For each student, simulate fetching their attendance (delay 100ms)
// 3. Calculate a grade based on attendance and skill level
// 4. Write the report to 'student-report.json'
// Use parallel operations where possible for performance
const generateStudentReport = async () => {
  // Your code here
  // This combines file reading, parallel operations, data transformation,
  // and file writing
  const data = await loadStudentData();
  const students = data.students;

  const attendancePromises = students.map(async (student) => {
    await delay(100);
    return {
      ...student,
    };
  });

  const studentsWithAttendance = await Promise.all(attendancePromises);
  const reports = studentsWithAttendance.map((student) => createReportCard(student));
  const jsonString = JSON.stringify(reports);
  const outputPath = path.join(__dirname, 'student-report.json');
  await fs.writeFile(outputPath, jsonString, 'utf8');
};

// ========================================
// TEST YOUR FUNCTIONS
// ========================================

// Test Promise Basics
console.log('=== Promise Basics ===');
checkPositive(5)
  .then((result) => console.log('Positive result:', result))
  .catch((error) => console.log('Error:', error));

checkPositive(-5)
  .then((result) => console.log('Positive result:', result))
  .catch((error) => console.log('Error:', error));

// Test Async/Await
(async () => {
  console.log('\n=== Async/Await ===');
  console.log(await handleCheckPositiveAsync(10));
  console.log(await asyncGreeting('Alex'));

  console.log('\n=== File Operations ===');
  const data = await loadStudentData();
  console.log('Loaded students:', data.students.length);

  console.log('\n=== Parallel Operations ===');
  const users = await fetchMultipleUsers([1, 2, 3]);
  console.log('Fetched users:', users);

  console.log('\n=== Sequential vs Parallel ===');
  const start1 = Date.now();
  await sequentialOperations();
  console.log('Sequential took:', Date.now() - start1, 'ms');

  const start2 = Date.now();
  await parallelOperations();
  console.log('Parallel took:', Date.now() - start2, 'ms');

  console.log('\n=== Real World ===');
  await processStudentsBySport('soccer');
  console.log('Processed students by sport');

  await generateStudentReport();
  console.log('Generated student report');
})();
