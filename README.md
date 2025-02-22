# ScribePath 📝🚀  

ScribePath is an advanced **task and note management** application designed to **help technical product managers** streamline their workflow. Our goal is to create an intuitive platform for managing notes, tasks, and collaborative efforts, **integrating AI-powered features, advanced file handling, and seamless team collaboration.**  

🚀 **Built with the MERN Stack (MongoDB, Express, React, Node.js)**, Firebase for authentication, and AWS S3 for future file storage.

---

## **📌 Project Roadmap & Future Enhancements**
ScribePath is evolving **phase by phase**, with major milestones aimed at improving functionality and scalability.

### **🌟 Current Phase (MVP Development)**
✅ Firebase Authentication for secure login & registration  
✅ User management system with JWT authentication  
✅ Notes & Task CRUD operations with MongoDB  
✅ Rate limiting and security best practices  
✅ Soft delete (trash with auto-delete after 30 days)  
✅ CORS setup for frontend integration  

---

### **📅 Upcoming Features & Development Plan**
🔹 **Phase 2: Task Management Enhancements**  
🔹 **Phase 3: Embedded Content (YouTube, Images, Files)**  
🔹 **Phase 4: AI-Powered Task Suggestions & Summaries**  
🔹 **Phase 5: Personal vs. Team Environments**  
🔹 **Phase 6: Drag & Drop Boards for Task Organization**  

💡 **AI Integration (Long-Term Vision)**  
- Smart task suggestions based on user behavior  
- Summarization of notes using AI  
- Automated reminders and predictive deadline alerts  

---

## **🛠 Technologies Used**
### **Backend**
- **Node.js, Express.js** – API & business logic  
- **MongoDB + Mongoose** – Database & schemas  
- **Firebase Authentication** – Secure user management  
- **AWS S3** (Future) – File storage for notes and tasks  
- **Rate Limiting & CORS** – Security & API protection  

### **Frontend (Upcoming)**
- **React.js + Redux (Planned UI Framework)**  
- **Component-driven UI for a seamless experience**  

### **Deployment (To be Determined)**
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
├── /frontend (future implementation)
```

---

## **🚀 Setup and Installation**
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
- **CORS Policy**: Restricts access based on environment (`localhost` in dev, specific domains in prod`).  
- **Helmet.js**: Adds security headers to API responses.  

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **📫 Contact & Contribution**
We welcome contributions! If you’d like to collaborate, **fork the repository and submit a pull request.**  

For any questions, reach out via **GitHub Issues** or email: **carlos@michelhq.com**.  
