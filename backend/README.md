# ScribePath

ScribePath is a task and note management application designed to help technical product managers streamline their workflow. The application allows users to create and manage notes, tasks, categories, and tags while supporting authentication and file storage integrations.

## **Table of Contents**
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Upcoming Features](#upcoming-features)
- [License](#license)

---

## **Features**
✅ User Authentication using Firebase (Login, Registration, Password Reset)  
✅ Secure API with JWT-based authentication  
✅ CRUD operations for **Notes**, **Tasks**, and **Announcements**  
✅ Categorization & tagging system for notes and tasks  
✅ Soft delete functionality (Trash with 30-day retention)  
✅ Full-text search for quick access to notes and tasks  
✅ Rate limiting to prevent API abuse  

---

## **Technologies Used**
### **Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- Firebase Authentication
- AWS S3 (for future file storage support)

### **Frontend (Future Implementation)**:
- React.js
- Redux/Context API

### **Deployment (To be Determined)**:
- Possible services: **Heroku, AWS, DigitalOcean**
- CI/CD via **GitHub Actions**

---

## **Project Structure**
```
/ScribePath
├── /backend
│   ├── /controllers      # Business logic for APIs
│   ├── /middlewares      # Authentication & security layers
│   ├── /models          # Mongoose schemas
│   ├── /routes          # API endpoints
│   ├── /services        # AWS/Firebase integrations
│   ├── .env.example     # Example environment file
│   ├── server.js        # Main Express.js server
│   └── firebaseAdmin.js # Firebase admin setup
├── /frontend (future implementation)
```

---

## **Setup and Installation**
### **Prerequisites**
- Node.js (v14+)
- MongoDB Atlas account
- Firebase Project for authentication
- AWS S3 bucket (for future file storage support)
- Git

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/MichelHQ-Projects/ScribePath.git
cd ScribePath
```

### **2️⃣ Install Dependencies**
```bash
cd backend
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the `/backend` folder using the provided `.env.example` template:
```bash
cp .env.example .env
```
Fill in the required values for:
- `PORT`
- `MONGO_URI`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `AWS_ACCESS_KEY_ID` (for future file support)
- `AWS_SECRET_ACCESS_KEY`
- `JWT_SECRET`

### **4️⃣ Start the Server**
```bash
npm run dev
```
The server should now be running at `http://localhost:5000`

---

## **API Documentation**
### **Authentication**
| Method | Endpoint               | Description                 | Auth Required |
|--------|------------------------|-----------------------------|--------------|
| POST   | `/api/users/register`  | Register a new user         | ❌ No |
| POST   | `/api/users/login`     | Log in a user               | ❌ No |
| POST   | `/api/users/reset-password` | Reset user password | ❌ No |

### **Notes API**
| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|--------------|
| GET    | `/api/notes`  | Get all notes              | ✅ Yes |
| POST   | `/api/notes`  | Create a new note          | ✅ Yes |
| GET    | `/api/notes/:id` | Get a specific note      | ✅ Yes |
| PUT    | `/api/notes/:id` | Update an existing note | ✅ Yes |
| DELETE | `/api/notes/:id` | Move note to trash       | ✅ Yes |

### **Tasks API**
| Method | Endpoint       | Description               | Auth Required |
|--------|---------------|---------------------------|--------------|
| GET    | `/api/tasks`  | Get all tasks             | ✅ Yes |
| POST   | `/api/tasks`  | Create a new task         | ✅ Yes |
| GET    | `/api/tasks/:id` | Get a specific task    | ✅ Yes |
| PUT    | `/api/tasks/:id` | Update an existing task | ✅ Yes |
| DELETE | `/api/tasks/:id` | Delete a task           | ✅ Yes |

---

## **Upcoming Features**
📌 **File Attachments for Notes** (Using AWS S3)  
📌 **Collaborative Notes** (Real-time editing)  
📌 **Version Control** (Track changes over time)  
📌 **Reminders & Notifications** (Email + In-App Alerts)  
📌 **OAuth Integration** (Login via Google, GitHub, etc.)  
📌 **Personal vs. Team Environments** (Shared Notes & Tasks)  
📌 **Drag and Drop Boards** (Trello-style task management)  

---

## **License**
This project is licensed under the **MIT License**.

---

## **🚀 Contributing**
We welcome contributions! Please fork the repo and submit a pull request.

---

## **📫 Contact**
For any questions or support, reach out via GitHub Issues or email: **your-email@example.com**.
