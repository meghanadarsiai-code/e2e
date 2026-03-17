export const MOCK_USER = {
  _id: "1",
  fullName: "John Doe",
  email: "john@cipher.com",
  role: "admin",
  profileImg: "https://ui-avatars.com/api/?name=John+Doe",
  aboutMe: "Full Stack Developer looking to learn and grow.",
  gitHub: "https://github.com/johndoe",
  linkedIn: "https://linkedin.com/in/johndoe",
  faceBook: "https://facebook.com/johndoe",
  twitter: "https://twitter.com/johndoe",
  instagram: "https://instagram.com/johndoe",
  website: "https://johndoe.com",
  highestEducation: "B.Tech Computer Science",
  currentStatus: "Student",
  intrest1: "Web Development",
  intrest2: "Machine Learning",
  intrest3: "Cloud Computing",
  intrest4: "Data Structures",
  followers: [],
  following: []
};

export const MOCK_USERS = [
  MOCK_USER,
  {
    _id: "2",
    fullName: "Jane Smith",
    email: "jane@cipher.com",
    role: "student",
    profileImg: "https://ui-avatars.com/api/?name=Jane+Smith",
    aboutMe: "Aspiring Data Scientist",
    gitHub: "https://github.com/janesmith",
    followers: [MOCK_USER],
    following: []
  },
  {
    _id: "3",
    fullName: "Bob Wilson",
    email: "bob@cipher.com",
    role: "student",
    profileImg: "https://ui-avatars.com/api/?name=Bob+Wilson",
    aboutMe: "Java Enthusiast",
    gitHub: "https://github.com/bobwilson",
    followers: [],
    following: [MOCK_USER]
  }
];

export const MOCK_COURSES = [
  { id: "c1", name: "Data Structures & Algorithms", description: "Master DSA from basic to advanced levels. Covers arrays, linked lists, trees, graphs, and more using C++ and Java.", material: "#", category: "DSA" },
  { id: "c2", name: "Complete Web Development Bootcamp", description: "Become a full-stack developer with HTML, CSS, JavaScript, React, Node.js, and MongoDB.", material: "#", category: "Web Development" },
  { id: "c3", name: "Machine Learning A-Z", description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.", material: "#", category: "Data Science" },
  { id: "c4", name: "System Design for Beginners", description: "Learn how to design scalable systems. Essential for cracking interviews at top tech companies.", material: "#", category: "System Design" },
  { id: "c5", name: "Java Programming Masterclass", description: "Learn Java In-Depth: OOPs, Collections, Multithreading, Streams, and more.", material: "#", category: "Programming Languages" },
  { id: "c6", name: "Python for Data Science and AI", description: "Python for Data Science, AI & Development. Learn Python basics, data structures, and data analysis.", material: "#", category: "Data Science" },
  { id: "c7", name: "C++ Standard Template Library (STL)", description: "Master the C++ STL for competitive programming. Vectors, Maps, Sets, and Algorithms.", material: "#", category: "Programming Languages" },
  { id: "c8", name: "Operating Systems Principles", description: "Understand the core concepts of Operating Systems: Process Management, Memory Management, File Systems.", material: "#", category: "CS Fundamentals" },
  { id: "c9", name: "Database Management Systems (DBMS)", description: "Learn about SQL, NoSQL, Normalization, Transactions, and Indexing.", material: "#", category: "CS Fundamentals" },
  { id: "c10", name: "Computer Networks", description: "Deep dive into OSI Model, TCP/IP, HTTP, DNS, and Network Security.", material: "#", category: "CS Fundamentals" },
  { id: "c11", name: "Android App Development with Kotlin", description: "Build professional Android apps using Kotlin and Android Jetpack.", material: "#", category: "App Development" },
  { id: "c12", name: "iOS Development with Swift", description: "Learn iOS App Development from scratch using Swift 5 and UIKit.", material: "#", category: "App Development" },
  { id: "c13", name: "DevOps Beginners to Advanced", description: "Learn Docker, Kubernetes, Jenkins, AWS, and CI/CD pipelines.", material: "#", category: "DevOps" },
  { id: "c14", name: "Cyber Security Fundamentals", description: "Understand the basics of Cyber Security, Ethical Hacking, and Network Defenses.", material: "#", category: "Cyber Security" },
  { id: "c15", name: "Artificial Intelligence: Reinforcement Learning", description: "Complete guide to Reinforcement Learning, Q-Learning, and Deep Q-Learning.", material: "#", category: "Data Science" },
  { id: "c16", name: "Blockchain & Cryptocurrency", description: "Understand how Blockchain works, Bitcoin, Ethereum, and Smart Contracts.", material: "#", category: "Emerging Tech" },
  { id: "c17", name: "Cloud Computing with AWS", description: "Become an AWS Certified Solutions Architect. EC2, S3, RDS, Lambda, and more.", material: "#", category: "Cloud Computing" },
  { id: "c18", name: "Competitive Programming", description: "Ace competitive programming contests with advanced algorithms and problem-solving techniques.", material: "#", category: "DSA" }
];

export const MOCK_TESTS = [
  {
    id: 't1',
    title: 'React Basics Quiz',
    questions: [
      { question: 'What is a component?', options: ['Function', 'Variable', 'HTML'], answer: 'Function' },
      { question: 'What is state?', options: ['Data', 'Style', 'Markup'], answer: 'Data' }
    ]
  }
];

export const MOCK_CERTIFICATES = [
  { id: 1, course: 'Intro to React', date: new Date().toISOString(), score: 85, url: '#' }
];

export const MOCK_USER_DETAILS = { ...MOCK_USER, aboutMe: 'Passionate developer', gitHub: 'github.com/mock', linkedIn: 'linkedin.com/mock' };
