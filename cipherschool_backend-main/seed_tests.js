const mongoose = require("mongoose");
require("dotenv").config();
const { MONGOBD_URL } = require("./config");
const TestModel = require("./models/test_model");

const defaultTests = [
    {
        title: "JavaScript Fundamentals Quiz",
        difficulty: "Medium",
        duration: "45 Mins",
        questions: [
            {
                type: "MCQ",
                question: "What is the output of 'typeof null' in JavaScript?",
                options: ["'null'", "'object'", "'undefined'", "'boolean'"],
                answer: "'object'"
            },
            {
                type: "Fill-in-the-blank",
                question: "The method used to combine two or more arrays without modifying existing arrays is called ___.",
                options: [],
                answer: "concat"
            },
            {
                type: "Descriptive",
                question: "Explain the concept of closures in JavaScript with a brief example.",
                options: [],
                answer: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)."
            }
        ]
    },
    {
        title: "React Concepts Assessment",
        difficulty: "Hard",
        duration: "60 Mins",
        questions: [
            {
                type: "MCQ",
                question: "Which hook is used for performing side effects in functional components?",
                options: ["useState", "useReducer", "useEffect", "useMemo"],
                answer: "useEffect"
            },
            {
                type: "MCQ",
                question: "React relies on a mechanism to update the DOM efficiently. What is it called?",
                options: ["Real DOM", "Shadow DOM", "Virtual DOM", "Document Fragment"],
                answer: "Virtual DOM"
            }
        ]
    },
    {
        title: "Basic Mathematics and Aptitude",
        difficulty: "Easy",
        duration: "20 Mins",
        questions: [
            {
                type: "Fill-in-the-blank",
                question: "What is the next number in the sequence: 2, 4, 8, 16, ___?",
                options: [],
                answer: "32"
            }
        ]
    }
];

mongoose.connect(MONGOBD_URL)
    .then(async () => {
        console.log("Connected to MongoDB");

        try {
            console.log("Deleting existing tests...");
            await TestModel.deleteMany({});

            console.log("Seeding default tests...");
            await TestModel.insertMany(defaultTests);

            console.log("Tests seeded successfully!");
            process.exit(0);

        } catch (error) {
            console.error("Error seeding tests:", error);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });
