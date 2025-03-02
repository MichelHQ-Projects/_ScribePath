# ScribePath 📝🚀  

# 📌 ScribePath 📝🚀  

ScribePath is an advanced **task and note management** application designed to **help technical product managers** streamline their workflow. Our goal is to create an intuitive platform for managing notes, tasks, and collaborative efforts, **integrating AI-powered features, advanced file handling, and seamless team collaboration.**  

🚀 **Built with the MERN Stack (MongoDB, Express, React, Node.js)**, Firebase for authentication, and AWS S3 for file storage.

---

## **📢 Changelog**
### **Latest Updates - March 2024**

### ✅ **Task Management Added**
- Implemented **Task Creation** within the same form as Notes.
- Tasks now have **priority, completion status, and due date** fields.
- Integrated **PriorityAndScheduling.js** for **task scheduling**.
- Backend API for Tasks (`taskRoutes.js`, `taskController.js`) fully implemented.
- Created `taskService.js` for **frontend API calls**.

### ✅ **Dynamic Form Improvements**
- `NewProduct.js` now **dynamically adjusts** form fields based on `selectedType` (`Note` vs `Task`).
- Task-specific fields like **priority and due date** only show when "Task" is selected.
- Notes and Tasks **share the same image upload system**.
- Integrated `Schedule.js` component for **Task Due Date selection**.

### ✅ **Enhanced Image Handling**
- Implemented **AWS S3 uploads** with secure, public-read bucket policies.
- Images are now **uploaded on Save**, preventing unnecessary uploads.
- `File.js` now supports **real-time image previews** before upload.
- Image URLs are **stored in Notes/Tasks**, allowing reuse.
- Updated **Bucket Policies** to prevent unauthorized deletions while allowing public access.

### ✅ **Backend Enhancements**
- Improved **MongoDB schema** for Notes and Tasks.
- Added **error handling & debugging logs** in `noteController.js` and `taskController.js`.
- Created `/api/images/upload` for **secure image storage in S3**.

---

## **📅 Upcoming Features & Development Plan**
### 🔹 **Profile Management**
- Profile View UI (User details, email, and profile picture).
- Implement **Profile Image Upload** to AWS S3.
- Display **Profile Image** in the Dashboard and Navbar.

### 🔹 **Dashboard Integration**
- Fetch **Notes, Tasks, and Projects** from backend.
- Display **summary widgets** (Total Notes, Pending Tasks, Completed Tasks, etc.).
- Implement **quick actions** (Create Note/Task directly from Dashboard).

### 🔹 **Expanded Views**
- **Individual Note View** (Read/Edit a single note).
- **Individual Task View** (Read/Edit a single task, mark complete).
- **All Notes Page** (Paginated list of all notes).
- **All Tasks Page** (List of all tasks with filters: Pending, Completed, High Priority).
- **Projects View** (Allow users to create and manage Projects in future iterations).

### 🔹 **Optimizations & Enhancements**
- Improve **UI responsiveness** for mobile/tablet users.
- Implement **search & filtering** for Notes and Tasks.
- Enhance **error handling & loading states**.

---

## **🛠 Technologies Used**
### **Backend**
- **Node.js, Express.js** – API & business logic  
- **MongoDB + Mongoose** – Database & schemas  
- **Firebase Authentication** – Secure user management  
- **AWS S3** – File storage for notes and tasks  
- **Rate Limiting & CORS** – Security & API protection  

### **Frontend**
- **React.js + Redux (Planned UI Framework)**  
- **Component-driven UI for a seamless experience**  

### **Deployment**
- Possible services: **Heroku, AWS, DigitalOcean**  
- CI/CD via **GitHub Actions**  

---

## **📂 Project Structure**
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
├── /frontend 
```

---

## **🚀 Setup and Installation**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/MichelHQ-Projects/ScribePath.git
cd ScribePath
```

### **2️⃣ Install Dependencies**
```
cd backend
npm install
cd ..
cd frontend
npm install
npm start
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the `/backend` & `/frontend` folder using the provided template:
```
cp .env.example .env
```
Fill in the required values:
#Backend
``` 
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_account_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key  # (Future feature)
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```
#Frontend
# API Base URL
REACT_APP_API_BASE_URL=http://localhost:5000

# Firebase
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain


### **4️⃣ Start the Server**
```bash
npm run dev
```
The backend should now be running at:
```
http://localhost:5000
```

---

## **📖 API Documentation**
### **📌 Authentication API**
| Method | Endpoint               | Description                 | Auth Required |
|--------|------------------------|-----------------------------|--------------|
| POST   | `/api/users/register`  | Register a new user         | ❌ No |
| POST   | `/api/users/login`     | Log in a user               | ❌ No |
| POST   | `/api/users/reset-password` | Reset user password | ❌ No |

### **📌 Notes API**
| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|--------------|
| GET    | `/api/notes`  | Get all notes              | ✅ Yes |
| POST   | `/api/notes`  | Create a new note          | ✅ Yes |
| GET    | `/api/notes/:id` | Get a specific note      | ✅ Yes |
| PUT    | `/api/notes/:id` | Update an existing note | ✅ Yes |
| DELETE | `/api/notes/:id` | Move note to trash       | ✅ Yes |

### **📌 Tasks API**
| Method | Endpoint       | Description               | Auth Required |
|--------|---------------|---------------------------|--------------|
| GET    | `/api/tasks`  | Get all tasks             | ✅ Yes |
| POST   | `/api/tasks`  | Create a new task         | ✅ Yes |
| GET    | `/api/tasks/:id` | Get a specific task    | ✅ Yes |
| PUT    | `/api/tasks/:id` | Update an existing task | ✅ Yes |
| DELETE | `/api/tasks/:id` | Delete a task           | ✅ Yes |

---

## **🔐 Security & Middleware**
- **Authentication Middleware**: Ensures only logged-in users can access protected routes.  
- **Rate Limiting**: Limits API requests to prevent abuse (`100 requests per 15 minutes`).  
- **CORS Policy**: Restricts access based on environment (`localhost` in dev, specific domains in prod`).  
- **Helmet.js**: Adds security headers to API responses.  

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **📫 Contact & Contribution**
We welcome contributions! If you’d like to collaborate, **fork the repository and submit a pull request.**  

For any questions, reach out via **GitHub Issues** or email: **carlos@michelhq.com**.  
