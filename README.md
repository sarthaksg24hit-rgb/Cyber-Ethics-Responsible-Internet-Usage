# Cyber Ethics & Responsible Internet Usage

An interactive, full-stack educational web platform designed to teach college students about digital citizenship, online privacy, netiquette, and cyberbullying. 

## Features
- **User Authentication:** Secure login and signup system.
- **Role-Based Access:** Dedicated Student dashboard and Admin monitoring panel.
- **Interactive Modules:** 6 comprehensive modules featuring study notes and embedded educational videos.
- **Dynamic Quizzes:** Interactive quizzes after each module to test knowledge.
- **Progress Tracking:** Saves user progress, quiz scores, and completion status.
- **Certificate Generation:** Generates a printable certificate upon scoring 70%+ in all modules.

## Tech Stack
- **Frontend:** React, Vite, React Router, Vanilla CSS, Lucide Icons
- **Backend:** Node.js, Express.js
- **Security:** JWT (JSON Web Tokens), Bcrypt for password hashing

---

## How to Run the Project Locally

Because this project features a secure Node.js backend to track student progress, it must be run using both a frontend and backend server.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Clone the Repository
```bash
git clone https://github.com/sarthaksg24hit-rgb/Cyber-Ethics-Responsible-Internet-Usage.git
cd Cyber-Ethics-Responsible-Internet-Usage
```

### 2. Run the Application
Open a terminal in the project root folder and run:
```bash
npm install
npm run dev
```
*This single command will automatically install dependencies and start both the Express backend (port 3001) and Vite frontend (port 5173) simultaneously!*

---

## Test Accounts
You can use the following pre-configured accounts to test the platform:

**Student Account:**
- **Email:** `student@test.com`
- **Password:** `Test1234`

**Admin Account:**
- **Email:** `admin@cyberethics.com`
- **Password:** `Admin1234`
