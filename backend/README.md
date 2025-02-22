# ScribePath Backend

The backend of **ScribePath** is a **Node.js & Express.js API** designed for managing tasks and notes. It provides authentication, CRUD operations for notes and tasks, and integrations with Firebase Authentication and MongoDB.

---

## **🛠 Features**
✅ **User Authentication** via Firebase  
✅ **JWT-based API Security**  
✅ **CRUD operations for Notes & Tasks**  
✅ **Soft delete (Trash with auto-delete after 30 days)**  
✅ **Full-text search support (Future update)**  
✅ **Rate limiting to prevent API abuse**  
✅ **Role-based access control (Future update)**  

---

## **🛠 Technologies Used**
- **Backend Framework**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: Firebase Authentication + JWT  
- **File Storage**: AWS S3 (Future update)  
- **Security**: Helmet.js, Rate Limiting, CORS  

---

## **📂 Project Structure**
```
backend/
├── controllers/         # Business logic for APIs
├── middlewares/         # Authentication & security layers
├── models/              # MongoDB schemas
├── routes/              # API endpoints
├── services/            # AWS/Firebase integrations (future)
├── test/                # API test scripts (for Postman)
├── .env.example         # Example environment file
├── firebaseAdmin.js     # Firebase admin setup
├── rateLimiterMiddleware.js  # API rate limiting
├── server.js            # Main Express server
└── README.md            # Backend documentation
```

---

## **🚀 Setup and Installation**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/MichelHQ-Projects/ScribePath.git
cd ScribePath/backend
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the `/backend` folder using the provided template:
```bash
cp .env.example .env
```
Fill in the required values:
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
- **CORS Policy**: Restricts access based on environment (`localhost` in dev, specific domains in prod).
- **Helmet.js**: Adds security headers to API responses.

---

## **📌 Upcoming Features**
📌 **File Attachments for Notes (AWS S3)**  
📌 **Collaborative Notes** (Real-time editing)  
📌 **Reminders & Notifications** (Email + In-App Alerts)  
📌 **Role-based Permissions** (Admin, Editor, Viewer)  
📌 **OAuth Integration (Google, GitHub, etc.)**  
📌 **Drag & Drop Boards (Trello-style Task Management)**  

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **📫 Contact**
For any questions or support, reach out via GitHub Issues or email: **carlos@michelhq.com**.
