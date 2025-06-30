
# 📚 EduConnect – Classroom Management System

EduConnect is a modern classroom management system that bridges the gap between teachers and students. It simplifies classroom tasks like sharing study materials, managing assignments, and tracking student progress—all in one intuitive platform.

---

##  Key Features

### 👩‍🏫 For Teachers
- 🔹 **Classroom Control** – Create, update, delete classes with unique join codes  
- 📎 **Material Uploads** – Upload one or multiple files in a single session, preview/download anytime  
- 📝 **Smart Assignments** – Set deadlines, allow/block late submissions, and track student uploads  

### 👨‍🎓 For Students
- 🔹 **Easy Access** – Join classes using a unique classroom code  
- 📥 **Study Materials** – Preview or download class materials anytime  
- 📤 **Submit Work** – Upload assignments before the deadline  

---

## Who is it for?

- **Teachers** looking to organize digital classrooms effortlessly  
- **Students** who need quick access to assignments and learning materials  
- **Educational institutions** seeking a lightweight digital classroom alternative  

---



### 📁 `.env` Configuration

Create a `.env` file for **frontend**.<br>
Create an `application.properties` for **backend**.

#### 🛠️ Backend `application.properties`

```application.properties

spring.application.name=_spring_app_name
spring.data.mongodb.database=_your_database_name
spring.data.mongodb.uri="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"

```

#### 🌐 Frontend `.env`

```env

 REACT_APP_API_KEY=your_firebase_api_key
 REACT_APP_DOMAIN=your_project_id.firebaseapp.com
 REACT_APP_PROJECTID=your_project_id
 REACT_APP_BUCKET=your_project_id.appspot.com
 REACT_APP_MESSAGESENDERID=your_sender_id
 REACT_APP_APPID=1:your_app_id
 REACT_APP_MEASUREMENTID=G-NK7TMQ2B1K

```

---


## ⚙️ How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nisarg155/EduConnect_with_spring_and_react

### 🔧 Backend (Spring Boot)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. Backend will run on:

   ```
   http://localhost:8080
   ```
<br>

> Make sure you have Java 17+ and Maven installed.


### 💻 Frontend (React )

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. Visit the frontend at:

   ```
   http://localhost:3000
   ```


---


## 🧰 Tech Stack


### 🧱 **Tech Stack Overview**

| Layer        | Technology                                                                                                                                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)                                   |
| **Backend**  | ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge\&logo=spring-boot\&logoColor=white)                                                                                                                             |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)                                                                                                                                         |
| **Auth**     | ![Firebase](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge\&logo=firebase\&logoColor=black)                                                                                                                                 |
| **Storage**  | ![Firebase Storage](https://img.shields.io/badge/Firebase_Storage-FFA000?style=for-the-badge\&logo=firebase\&logoColor=black) ![Local Storage](https://img.shields.io/badge/Local_Storage-444444?style=for-the-badge\&logo=files\&logoColor=white) |
| **Styling**  | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white) ![Flowbite](https://img.shields.io/badge/Flowbite-0F172A?style=for-the-badge\&logo=flowbite\&logoColor=00BFFF)           |

---
