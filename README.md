# 🛡️ Digital e-Malkhana

A secure digital e-Malkhana system for managing seized property with **QR-based tracking** and **tamper-proof chain of custody**.

This project digitizes the lifecycle of seized property — from seizure to disposal — ensuring transparency, accountability, and legal compliance for law-enforcement agencies and is built as a part of induction process for Web Team of NIT Jamshedpur.

---

## 📌 Problem Statement

Traditional physical Malkhana systems suffer from:
- Manual record keeping
- Loss or misplacement of evidence
- Weak chain-of-custody tracking
- Poor auditability during court proceedings

### ✅ Solution
This platform provides:
- Digital case and property management
- QR-based property identification
- Chronological, immutable chain of custody
- Controlled evidence transfer and disposal tracking

---

## 🚀 Features

### 🔹 Case Management
- Create and manage criminal cases
- Track case status (Pending / Disposed)
- Auto-update case status based on property lifecycle

### 🔹 Property Management
- Register multiple properties per case
- Assign QR codes to each property
- Track property status (`IN CUSTODY`, `DISPOSED`)

### 🔹 QR Code Integration
- Each property gets a unique QR code
- QR encodes secure identifiers (property + case)
- Enables instant digital verification

### 🔹 Chain of Custody (Module-4 Compliant)
- Auto-generated initial custody on seizure
- Manual custody transfers (Court, FSL, Storage, etc.)
- Auto-generated final custody on disposal
- System-generated timestamps to prevent tampering

### 🔹 Disposal Management
- Dispose property via court order
- Records final custody movement
- Ensures custody chain completeness

### 🔹 Authentication & Authorization
- JWT-based authentication
- Protected APIs
- Secure access control

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- shadcn/ui
- Zustand (State Management)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---
## ⚙️ Prerequisites

Make sure you have the following installed:
* **Node.js** (v18+ recommended)
* **MongoDB** (Local or MongoDB Atlas)
* **Git**

---

## 🧪 Local Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/raunak-1703/E-Malkhana.git
cd E-Malkhana
```

### 2️⃣ Install Dependencies
**Frontend**
```bash
cd frontend
npm install
```

**Backend**
```bash
cd ../backend
npm install
```

### 3️⃣ Setup Environment Variables

**Backend (backend/.env)**
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend (frontend/.env)**
```bash
VITE_API_URL=http://localhost:3000/api
```

### 4️⃣ Start the Application
**Backend**

cd backend
```bash
npm run dev
```

**Frontend**
```bash
cd frontend
npm run dev
```

Open in browser → ```http://localhost:5173```


---
## 🌍 Deployment
```text
# Frontend (Vercel)
Build command: npm run build

# Backend (Render)
Build command: npm install
Start command: npm start
```
---

# 🛡️ Evidence Management System Architecture

## 🔐 Authentication Flow
1.  **User Login:** User authenticates via secure credentials.
2.  **JWT Issuance:** Backend validates credentials and issues a **JSON Web Token (JWT)**.
3.  **Secure Storage:** The token is persisted in the localStorage just for the Hackathon and later it will be stored in frontend state using **Zustand**.
4.  **Authorization:** Middleware ensures protected routes require a valid token for access.



---

## 🔁 Chain of Custody Design (Immutable Tracking)
Custody is tracked using **append-only logs** to ensure maximum transparency and legal defensibility.

### Key Custody Events:
* **Initial Seizure:** Automatically generated during the case registration phase.
* **Intermediate Transfers:** Manual entries for movement (e.g., to Court, Forensic Science Lab (FSL)).
* **Final Disposal:** Automatically triggered upon formal case closure.
* **Integrity:** All timestamps are system-generated; manual overrides are strictly prohibited.

### 🧾 Sample Custody Timeline
`Crime Scene` ➔ `Malkhana (Evidence Room)` ➔ `Court` ➔ `Malkhana` ➔ `Disposal Authority`

---

## 🧑‍⚖️ Legal Integrity Considerations
* **No Manual Timestamps:** Prevents the backdating or manipulation of evidence records.
* **Sequential Logic:** The *Source* of a custody transfer is programmatically derived from the previous log's *Destination*.
* **State Locking:** Once property reaches a "Disposed" status, it is locked and cannot be transferred further.
* **Audit Trail:** Provides a complete, unmodifiable history for every unique item in the system.

---

## 🧪 Sample Data & Testing
API payloads for cases, properties, and transfers are documented in the development environment. 
* **Tools:** Use **Postman** or **Thunder Client** for endpoint verification.

## 🚀 API Documentation: Evidence Management System

Base URL: `/api/v1`

## 🔑 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Authenticate and receive JWT. | No |

---

### 📁 Case Management (`/api/cases`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Initialize a new case record. |
| `GET` | `/` | Fetch all cases (supports filters: `Crime Number`, `Crime Year`). |
| `GET` | `/:id` | Get detailed case profile and associated evidence. |
---

### 📦 Property & Evidence (`/api/properties`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Register new evidence (creates initial seizure log). |


---

### ⛓️ Chain of Custody (`/api/custody`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Record movement (Source -> Destination). |
| `GET` | `/:propertyId` | Retrieve full immutable audit trail for an item. |
---

### ♻️ Disposal (`/api/disposal`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Initiate disposal request for closed-case property. |

---

### 📊 Dashboard (`/api/dashboard`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Aggregate data (Total cases, Active evidence, Disposed). |


---

## 🔗 Links

- **GitHub Repository:** https://github.com/raunak-1703/E-Malkhana
- **Live Demo:** https://emalkhana.vercel.app
---


> [!IMPORTANT]  
> **Demo Access Credentials** > To log in to the site, please use the following credentials:  
> - **Username:** `admin`  
> - **Password:** `admin123`
