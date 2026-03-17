# CipherSchools Project Documentation

## Page 1: Project Overview & Architecture

### 1.1 Introduction
**CipherSchools** is a comprehensive Study Management System designed to revolutionize online learning. It bridges the gap between traditional education and modern technology by integrating features like creating and taking courses, automated certification, AI-powered study assistance, and a dedicated administration portal. The platform focuses on providing a seamless, interactive, and rewarding experience for students while offering robust management tools for administrators.

### 1.2 Core Objectives
*   **Interactive Learning:** Engage students with dynamic course content and assignments.
*   **Automated Certification:** Reward progress instantly with generated certificates upon passing rigorous exams.
*   **AI Support:** Provide 24/7 study assistance through an integrated Gemini-powered AI chatbot.
*   **Secure Administration:** Empower platform managers with a secure, role-based dashboard for user and content management.

### 1.3 System Architecture
The application follows a classic **MERN Stack** (MongoDB, Express.js, React, Node.js) architecture, enhanced with file-based storage for lightweight flexibility.

*   **Client (Frontend):** A React.js Single Page Application (SPA) that handles all user interactions, routing, and data presentation. It interacts with the backend via RESTful APIs.
*   **Server (Backend):** A Node.js runtime environment using Express.js to handle API requests, business logic, authentication, and communication with the database and AI services.
*   **Database:** 
    *   **MongoDB:** Stores critical user data (profiles, credentials) and admin records for secure, scalable persistence.
    *   **JSON Storage:** Utilizes local JSON files (`courses.json`, `tests.json`, `certificates.json`) for flexible content management and rapid prototyping of features.
*   **External Services:**
    *   **Google Gemini API:** Powers the "Chat with AI" feature for intelligent, context-aware responses.
    *   **PDFKit:** Generates professional PDF certificates on the fly.

---

## Page 2: Frontend Technology Stack & Structure

### 2.1 Technology Stack
*   **Core Framework:** **React.js** (v18) for building a component-based UI.
*   **State Management:** **Redux** for managing global application state (user sessions, login status).
*   **Routing:** **React Router DOM** for seamless, client-side navigation between pages without refreshing.
*   **Styling:** 
    *   **Bootstrap 5 & React-Bootstrap:** For responsive grid layouts, modals, and pre-built components.
    *   **CSS3:** Custom styles for branding, animations (glassmorphism), and specific design tweaks.
*   **Utilities:**
    *   **Axios:** For making HTTP requests to the backend.
    *   **SweetAlert2:** For beautiful, responsive pop-up alerts and user feedback.
    *   **FontAwesome:** For rich iconography throughout the application.

### 2.2 Key Pages & Components
*   **Home (`/home`):** The landing page featuring an intro card, course highlights, and access to login/signup.
*   **Assignments (`/assignments`):** A dynamic hub for Daily, Weekly, and Monthly tasks. Replaced the old "Community" page to focus on productivity.
*   **Courses (`/courses`):** A catalog of available courses. Includes an "Add Course" feature visible only to Admins.
*   **Tests (`/tests`):** The examination module. Users take MCQ-based tests. Passing a test (>60%) unlocks a certificate.
*   **Certificates (`/certificate`):** A "Hall of Fame" where users can view and download their earned credentials.
*   **AI Chat (`/chat`):** An interactive chat interface connecting users to the Gemini AI model for study help.
*   **Admin Dashboard (`/admin-dashboard`):** A protected route for admins to view user statistics and manage the platform.

### 2.3 User Experience (UX) Highlights
*   **Role-Based UI:** The interface adapts based on who is logged in. Admins see management controls, while students see learning paths.
*   **Responsive Design:** Optimized for desktops, tablets, and mobile devices using Bootstrap's grid system.

---

## Page 3: Backend Technology & API Design

### 3.1 Technology Stack
*   **Runtime:** **Node.js** for high-performance, non-blocking execution.
*   **Framework:** **Express.js** for building a robust REST API structure.
*   **Security:**
    *   **Bcryptjs:** For hashing passwords to ensure they are never stored in plain text.
    *   **JsonWebToken (JWT):** For stateless, secure user authentication and session management.
    *   **CORS:** Configured to allow secure cross-origin requests from the frontend.

### 3.2 Key API Routes
*   **Authentication (`/api/user` & `/api/admin`):**
    *   `POST /signup`: Registers a new user.
    *   `POST /login`: Authenticates users and checks for Admin status.
    *   `POST /admin/login`: Specific endpoint for admin verification against the Admin collection.
*   **Features (`/api/features`):**
    *   `GET/POST /courses`: Fetches list of courses or adds a new one (Admin protected).
    *   `GET/POST /tests`: Manages exam content.
    *   `POST /certificate`: Generates a PDF certificate, saves metadata, and links it to the user.
    *   `POST /chats`: Sends user queries to Gemini AI and stores the conversation history.

### 3.3 Middleware
*   **protectedResource.js:** Verifies the JWT token in the request header. If invalid or missing, it blocks access.
*   **admin.js:** A secondary layer that checks the user's role. Even with a valid token, if the role isn't 'admin', access to sensitive routes (like creating courses) is denied.

---

## Page 4: Database & Data Management

### 4.1 MongoDB (The "Heavy Lifting" Database)
Used for data that requires strong consistency, security, and scalability.
*   **Connection:** Managed via `mongoose` to connecting to a cloud-based MongoDB Atlas cluster.
*   **Models:**
    *   **User Model:** Stores `fullName`, `email`, `password` (hashed), and `profileImg`.
    *   **Admin Model:** Stores `email` and `password` (hashed) for platform managers.

### 4.2 JSON File Storage (The "Agile" Database)
Used for content that changes frequently or needs to be easily editable without database queries.
*   **loc:** `cipherschool_backend-main/data/`
*   **Files:**
    *   `courses.json`: Array of course objects (ID, Name, Description, Material Link).
    *   `tests.json`: structured exams with questions, options, and correct answers.
    *   `chats.json`: Stores the chat history between users and the AI bot.
    *   `certificates.json`: Records of issued certificates, linking `userId`, `courseName`, `score`, and the `url` to the generated PDF.

### 4.3 Data Seeding
*   **`seed_admins.js`:** A utility script created to initialize the database with the first Admin account (`admin@cipherschools.com`). It handles the hashing of the initial password automatically.

---

## Page 5: Key Features & Functionalities

### 5.1 The Admin Ecosystem
This project features a distinct separation of concerns between Users and Admins.
*   **Secure Login:** Admins have a dedicated checkbox in the login modal. Checking it routes the credentials to the Admin API.
*   **Dashboard:** A private control center displaying platform metrics (Total Users, Certificates Issued).
*   **Content Control:** The ability to add new courses and tests is exclusive to Admins. These buttons are programmatically hidden from standard users.

### 5.2 The Certification Engine
A fully automated rewards system.
1.  **Trigger:** User takes a test in the "Tests" module.
2.  **Validation:** Backend scores the answers. If score > 60%, the process begins.
3.  **Generation:** `pdfkit` draws a custom certificate with the user's name and course details.
4.  **Persistence:** The file is saved to the server, and a record is written to `certificates.json` tagged with the user's unique ID.
5.  **Retrieval:** The "My Certificates" page fetches only the logged-in user's awards.

### 5.3 AI-Powered Study Buddy
*   **Integration:** Direct interface with Google's Gemini Flash model.
*   **Functionality:** Users can ask questions about their coursework. The backend relays the prompt to Gemini and streams the intelligent response back to the chat window, simulating a real tutor.

### 5.4 Assignment Management
*   **Structure:** Replaced the generic "Community" feed with a structured "Assignments" page.
*   **Types:** Daily (quick tasks), Weekly (mini-projects), and Monthly (major assessments) tabs to keep students organized and focused.
