const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const { MONGOBD_URL } = require("./config");
const AdminModel = require("./models/admin_model");

const CourseModel = require("./models/course_model");

const FIXED_ADMIN_EMAIL = "admin@cipherschools.com";
const FIXED_ADMIN_PASSWORD = "Admin@123";

const defaultCourses = [
  {
    title: "Advanced DevOps Architecture",
    description: "Learn how to build scalable pipelines, manage infrastructure as code, and deploy resilient applications.",
    category: "Software Engineering",
    level: "Advanced",
    duration: "8 weeks",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    instructor: "CipherSchool Systems"
  },
  {
    title: "UI/UX Masterclass",
    description: "Master the art of intuitive interfaces, user research, wireframing, and interactive design with Figma.",
    category: "Design",
    level: "Intermediate",
    duration: "6 weeks",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    instructor: "CipherSchool Design"
  },
  {
    title: "Cloud Native Applications",
    description: "Build, deploy, and scale modern web apps using containerization, Kubernetes, and serverless technologies.",
    category: "Cloud Computing",
    level: "Advanced",
    duration: "10 weeks",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    instructor: "CipherSchool Cloud"
  },
  {
    title: "Data Science Fundamentals",
    description: "Introduction to Python, pandas, data visualization, and foundational machine learning concepts.",
    category: "Data Science",
    level: "Beginner",
    duration: "4 weeks",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    instructor: "CipherSchool Data"
  },
  {
    title: "React Performance Optimization",
    description: "Deep dive into React concurrent mode, memoization, lazy loading, and state management optimization.",
    category: "Web Development",
    level: "Intermediate",
    duration: "5 weeks",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    instructor: "CipherSchool Web"
  }
];

const seedFixedAdmin = async () => {
  try {
    await mongoose.connect(MONGOBD_URL, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    const hashedPassword = await bcryptjs.hash(FIXED_ADMIN_PASSWORD, 10);

    const admin = await AdminModel.findOneAndUpdate(
      { email: FIXED_ADMIN_EMAIL },
      { email: FIXED_ADMIN_EMAIL, password: hashedPassword },
      { upsert: true, new: true }
    );

    console.log("Fixed admin ready:", admin.email);

    let coursesAdded = 0;
    for (const courseData of defaultCourses) {
      const exists = await CourseModel.findOne({ title: courseData.title });
      if (!exists) {
        courseData.author = admin._id;
        await CourseModel.create(courseData);
        coursesAdded++;
      }
    }
    console.log(`Successfully added ${coursesAdded} default courses.`);

    process.exit(0);
  } catch (error) {
    console.error("Failed to seed fixed admin or courses:", error.message);
    process.exit(1);
  }
};

seedFixedAdmin();
