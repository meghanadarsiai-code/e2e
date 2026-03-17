const mongoose = require("mongoose");
require("dotenv").config();
const { MONGOBD_URL } = require("./config");
const CourseModel = require("./models/course_model");

// Using high-quality unsplash tech photography
const newCourses = [
    {
        title: "Full-Stack Web Development Bootcamp",
        description: "Master React, Node.js, Express, and MongoDB. Build complete real-world applications from scratch.",
        category: "Web Development",
        level: "Beginner",
        duration: "12 weeks",
        thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
        instructor: "Sarah Jenkins"
    },
    {
        title: "Python for Data Science",
        description: "Dive deep into Pandas, NumPy, and Matplotlib. Learn how to clean, analyze, and visualize complex datasets.",
        category: "Data Science",
        level: "Intermediate",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        instructor: "Dr. Alan Turing"
    },
    {
        title: "Advanced System Design",
        description: "Learn how to architect scalable, distributed systems. Covering load balancing, caching, microservices, and databases.",
        category: "Software Engineering",
        level: "Advanced",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        instructor: "Marcus Aurelius"
    },
    {
        title: "Cybersecurity Ethical Hacking",
        description: "Understand vulnerabilities, penetration testing, and network defense strategies using Kali Linux.",
        category: "Security",
        level: "Intermediate",
        duration: "10 weeks",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        instructor: "Kevin Mitnick"
    },
    {
        title: "Mobile App Dev with React Native",
        description: "Build cross-platform iOS and Android applications with React Native, Expo, and native device APIs.",
        category: "Mobile Development",
        level: "Beginner",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        instructor: "Elena Rodriguez"
    },
    {
        title: "Machine Learning Masterclass",
        description: "Implement predictive models using Scikit-Learn and PyTorch. Covers regression, classification, and neural networking.",
        category: "Artificial Intelligence",
        level: "Advanced",
        duration: "14 weeks",
        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        instructor: "Andrew Ng"
    },
    {
        title: "Game Development with Unity",
        description: "Create immersive 2D and 3D games. Learn C# scripting, physics, animations, and game deployment.",
        category: "Game Design",
        level: "Beginner",
        duration: "10 weeks",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        instructor: "Carmack John"
    },
    {
        title: "Cloud Computing Architect",
        description: "Deploy serverless architectures, manage containers with Docker and Kubernetes, and master AWS services.",
        category: "DevOps",
        level: "Intermediate",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        instructor: "Linus Torvalds"
    },
    {
        title: "Blockchain & Smart Contracts",
        description: "Write decentralized applications (dApps) using Solidity, Web3.js, and deploy them on the Ethereum network.",
        category: "Web3",
        level: "Advanced",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop",
        instructor: "Satoshi N."
    },
    {
        title: "Mastering UI/UX Design",
        description: "Design intuitive and accessible interfaces using Figma. Covering wireframing, prototyping, and user testing.",
        category: "Design",
        level: "Beginner",
        duration: "4 weeks",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
        instructor: "Don Norman"
    }
];

mongoose.connect(MONGOBD_URL)
    .then(async () => {
        console.log("Connected to MongoDB");

        try {
            console.log("Seeding 10 new additional courses...");
            await CourseModel.insertMany(newCourses);

            console.log("10 Courses seeded successfully appended!");
            process.exit(0);

        } catch (error) {
            console.error("Error seeding courses:", error);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });
