// Exercise 1: JavaScript Syntax Practice
// Complete all TODO sections

// ========================================
// 1. Variables and Template Literals
// ========================================

// TODO: Create a function that takes a name and age and returns a greeting
// Use template literals (backticks)
// Example: greet("Alex", 15) should return "Hello, Alex! You are 15 years old."
const greet = (name, age) => {
  // Your code here
  return 'Hello, ' + name + ' You are ' + age + ' years old.';
};

// ========================================
// 2. Basic Math Functions
// ========================================

// TODO: Create a function that calculates the area of a rectangle
const calculateArea = (width, height) => {
  return width * height;
};

// TODO: Create a function that converts Fahrenheit to Celsius
// Formula: (fahrenheit - 32) * 5/9
const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

// ========================================
// 3. Conditionals
// ========================================

// TODO: Create a function that returns the letter grade for a percentage
// 90-100: 'A', 80-89: 'B', 70-79: 'C', 60-69: 'D', below 60: 'F'
const getLetterGrade = (percentage) => {
  if (percentage > 90) {
    return 'A';
  } else if (percentage > 80) {
    return 'B';
  } else if (percentage > 70) {
    return 'C';
  } else if (percentage > 60) {
    return 'D';
  } else {
    return 'F';
  }
};

// TODO: Create a function that checks if a number is even or odd
// Return "even" or "odd"
const evenOrOdd = (number) => {
  if (number % 2 === 0) {
    return 'even';
  } else {
    return 'odd';
  }
};

// TODO: Create a function that returns the larger of two numbers
const max = (a, b) => {
  if (a > b) {
    return a;
  } else {
    return b;
  }
};

// ========================================
// 4. Loops and Arrays
// ========================================

// TODO: Create a function that returns the sum of all numbers in an array
const sumArray = (numbers) => {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }

  return total;
};

// TODO: Create a function that returns the count of positive numbers in an array
const countPositive = (numbers) => {
  let posNums = 0;
  for (const number of numbers) {
    if (number >= 0) {
      posNums++;
    }
  }

  return posNums;
};

// TODO: Create a function that returns an array of all even numbers from the input
const filterEven = (numbers) => {
  let even = [];
  for (const number of numbers) {
    if (number % 2 === 0) {
      even.push(number);
    }
  }

  return even;
};

// ========================================
// 5. String Methods
// ========================================

// TODO: Create a function that capitalizes the first letter of a string
// Example: capitalize("hello") should return "Hello"
const capitalize = (str) => {
  return str[0].toUpperCase() + str.substring(1);
};

// TODO: Create a function that counts how many times a letter appears in a string
// Example: countLetter("hello", "l") should return 2
const countLetter = (str, letter) => {
  let letterCount = 0;
  for (const ch of str) {
    if (ch === letter) {
      letterCount++;
    }
  }

  return letterCount;
};

// TODO: Create a function that reverses a string
// Example: reverseString("hello") should return "olleh"
const reverseString = (str) => {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
};

// ========================================
// 6. Array Methods
// ========================================

// TODO: Create a function that returns the first element of an array
// Return undefined if array is empty
const getFirstElement = (arr) => {
  if (arr.length === 0) {
    return undefined;
  } else {
    return arr[0];
  }
};

// TODO: Create a function that returns the last element of an array
// Return undefined if array is empty
const getLastElement = (arr) => {
  if (arr.length === 0) {
    return undefined;
  } else {
    return arr[arr.length - 1];
  }
};

// TODO: Create a function that checks if an array contains a specific value
// Return true or false
const arrayContains = (arr, value) => {
  return arr.includes(value);

  // for (const val of arr) {
  //   if (value === val) {
  //     return true;
  //   }
  // }

  // return false;
};

// ========================================
// TEST YOUR FUNCTIONS
// ========================================
// Uncomment these lines to test your functions

console.log('=== Testing Variables and Template Literals ===');
console.log(greet('Alex', 15)); // "Hello, Alex! You are 15 years old."

console.log('\n=== Testing Math Functions ===');
console.log(calculateArea(5, 10)); // 50
console.log(fahrenheitToCelsius(32)); // 0
console.log(fahrenheitToCelsius(212)); // 100

console.log('\n=== Testing Conditionals ===');
console.log(getLetterGrade(95)); // 'A'
console.log(getLetterGrade(85)); // 'B'
console.log(getLetterGrade(55)); // 'F'
console.log(evenOrOdd(4)); // "even"
console.log(evenOrOdd(7)); // "odd"
console.log(max(10, 5)); // 10

console.log('\n=== Testing Loops and Arrays ===');
console.log(sumArray([1, 2, 3, 4, 5])); // 15
console.log(countPositive([1, -2, 3, -4, 5])); // 3
console.log(filterEven([1, 2, 3, 4, 5, 6])); // [2, 4, 6]

console.log('\n=== Testing String Methods ===');
console.log(capitalize('hello')); // "Hello"
console.log(countLetter('hello', 'l')); // 2
console.log(reverseString('hello')); // "olleh"

console.log('\n=== Testing Array Methods ===');
console.log(getFirstElement([1, 2, 3])); // 1
console.log(getLastElement([1, 2, 3])); // 3
console.log(arrayContains([1, 2, 3], 2)); // true
console.log(arrayContains([1, 2, 3], 5)); // false
