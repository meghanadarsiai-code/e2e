const mongoose = require("mongoose");
const CourseModel = require("./models/course_model");
const { MONGOBD_URL } = require("./config");

mongoose.connect(MONGOBD_URL);

const sampleCourses = [
  {
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript. Perfect for beginners starting their coding journey.",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    instructor: "Sarah Johnson",
    modules: [
      {
        moduleNumber: 1,
        title: "Introduction to HTML",
        content: `
# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages.

## What is HTML?
HTML stands for HyperText Markup Language. It is used to create and structure content on the web.

## Basic Structure
Every HTML document follows this basic structure:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>
\`\`\`

## Common HTML Tags
- **<h1> to <h6>**: Headings
- **<p>**: Paragraphs
- **<a>**: Links
- **<img>**: Images
- **<div>**: Division/Container
- **<span>**: Inline container

## Practice Exercise
Create a simple HTML page with:
1. A heading with your name
2. A paragraph about yourself
3. A link to your favorite website
        `,
        videoUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
      },
      {
        moduleNumber: 2,
        title: "CSS Styling Basics",
        content: `
# CSS Styling Basics

CSS (Cascading Style Sheets) is used to style and layout web pages.

## What is CSS?
CSS describes how HTML elements should be displayed on screen, paper, or in other media.

## How to Add CSS
There are three ways to add CSS:
1. **Inline CSS**: Using style attribute
2. **Internal CSS**: Using <style> tag in HTML
3. **External CSS**: Using separate .css file

## CSS Syntax
\`\`\`css
selector {
  property: value;
}
\`\`\`

## Common CSS Properties
- **color**: Text color
- **background-color**: Background color
- **font-size**: Size of text
- **margin**: Space outside element
- **padding**: Space inside element
- **border**: Border around element

## Example
\`\`\`css
h1 {
  color: blue;
  font-size: 32px;
  text-align: center;
}

p {
  color: #333;
  line-height: 1.6;
}
\`\`\`
        `,
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
      },
      {
        moduleNumber: 3,
        title: "JavaScript Fundamentals",
        content: `
# JavaScript Fundamentals

JavaScript is a programming language that adds interactivity to websites.

## Variables
Store data using variables:
\`\`\`javascript
let name = "John";
const age = 25;
var city = "New York";
\`\`\`

## Data Types
- **String**: Text data
- **Number**: Numeric data
- **Boolean**: true/false
- **Array**: List of items
- **Object**: Collection of properties

## Functions
Functions are reusable blocks of code:
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice"));
\`\`\`

## DOM Manipulation
Change HTML content with JavaScript:
\`\`\`javascript
document.getElementById("demo").innerHTML = "Hello!";
document.querySelector(".btn").addEventListener("click", function() {
  alert("Button clicked!");
});
\`\`\`

## Practice Project
Create a simple calculator that can:
1. Add two numbers
2. Subtract two numbers
3. Display result on the page
        `,
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
      },
    ],
  },
  {
    title: "Python Programming for Beginners",
    description: "Master Python programming from scratch. Learn syntax, data structures, and build real projects.",
    category: "Programming",
    level: "Beginner",
    duration: "8 weeks",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500",
    instructor: "Michael Chen",
    modules: [
      {
        moduleNumber: 1,
        title: "Python Basics",
        content: `
# Python Basics

Python is a high-level, interpreted programming language known for its simplicity.

## Getting Started
Install Python from python.org and use IDLE or any code editor.

## Your First Program
\`\`\`python
print("Hello, World!")
\`\`\`

## Variables and Data Types
\`\`\`python
# Variables
name = "Alice"
age = 25
height = 5.6
is_student = True

# Print variables
print(name)
print(f"I am {age} years old")
\`\`\`

## Basic Operations
\`\`\`python
# Arithmetic
x = 10 + 5
y = 20 - 3
z = 4 * 5
w = 10 / 2

# String operations
greeting = "Hello" + " " + "World"
repeated = "Python! " * 3
\`\`\`

## Input from User
\`\`\`python
name = input("What's your name? ")
print(f"Hello, {name}!")
\`\`\`
        `,
        videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
      },
      {
        moduleNumber: 2,
        title: "Control Flow",
        content: `
# Control Flow in Python

Learn how to control the flow of your program using conditionals and loops.

## If-Else Statements
\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# Multiple conditions
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

## Loops
### For Loop
\`\`\`python
# Loop through range
for i in range(5):
    print(i)

# Loop through list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

### While Loop
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Practice
Create a program that:
1. Asks user for a number
2. Checks if it's even or odd
3. Prints all numbers from 1 to that number
        `,
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      },
    ],
  },
  {
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms. Essential for technical interviews and competitive programming.",
    category: "Computer Science",
    level: "Intermediate",
    duration: "10 weeks",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
    instructor: "Dr. Robert Smith",
    modules: [
      {
        moduleNumber: 1,
        title: "Arrays and Strings",
        content: `
# Arrays and Strings

Arrays and strings are fundamental data structures used in programming.

## Arrays
An array is a collection of elements stored at contiguous memory locations.

### Array Operations
\`\`\`python
# Create array
arr = [1, 2, 3, 4, 5]

# Access elements
print(arr[0])  # First element
print(arr[-1])  # Last element

# Modify elements
arr[2] = 10

# Array methods
arr.append(6)  # Add to end
arr.insert(0, 0)  # Insert at position
arr.remove(10)  # Remove element
\`\`\`

## Common Array Problems
1. **Find Maximum Element**
2. **Reverse an Array**
3. **Two Sum Problem**
4. **Remove Duplicates**

### Example: Two Sum
\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\`

## Strings
Strings are sequences of characters.

\`\`\`python
text = "Hello World"
print(text.upper())  # HELLO WORLD
print(text.lower())  # hello world
print(text.split())  # ['Hello', 'World']
\`\`\`

## Practice Problems
1. Check if a string is a palindrome
2. Find the first non-repeating character
3. Reverse words in a sentence
        `,
        videoUrl: "https://www.youtube.com/watch?v=n8Y_6-AbK0M",
      },
    ],
  },
  {
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts, algorithms, and practical implementations using Python.",
    category: "Artificial Intelligence",
    level: "Advanced",
    duration: "12 weeks",
    thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500",
    instructor: "Dr. Emily Watson",
    modules: [
      {
        moduleNumber: 1,
        title: "Introduction to ML",
        content: `
# Introduction to Machine Learning

Machine Learning is a subset of AI that enables systems to learn from data.

## What is Machine Learning?
Machine learning is the science of getting computers to act without being explicitly programmed.

## Types of Machine Learning
1. **Supervised Learning**: Learn from labeled data
2. **Unsupervised Learning**: Find patterns in unlabeled data
3. **Reinforcement Learning**: Learn through trial and error

## Key Concepts
- **Training Data**: Data used to train the model
- **Test Data**: Data used to evaluate the model
- **Features**: Input variables
- **Labels**: Output variable (in supervised learning)
- **Model**: The learned representation

## Simple Example: Linear Regression
\`\`\`python
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make predictions
prediction = model.predict([[6]])
print(prediction)  # Output: [12]
\`\`\`

## Applications
- Image Recognition
- Speech Recognition
- Recommendation Systems
- Fraud Detection
- Medical Diagnosis
        `,
        videoUrl: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      },
    ],
  },
];

async function seedCourses() {
  try {
    // Clear existing courses
    await CourseModel.deleteMany({});
    console.log("Cleared existing courses");

    // Insert sample courses
    await CourseModel.insertMany(sampleCourses);
    console.log("Sample courses added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding courses:", error);
    mongoose.connection.close();
  }
}

seedCourses();
