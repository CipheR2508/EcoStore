# EcoStore - Full Stack E-Commerce Platform

A comprehensive, production-ready e-commerce platform built with modern technologies. This project features a robust REST API backend and a dynamic React frontend.

## 🏗️ Project Structure

- **`E-Commerce-Backend`**: Node.js/Express API handling authentication, products, cart, and orders.
- **`frontend`**: React/Vite web application with a modern UI.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MySQL** (v8.0 or higher)

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/CipheR2508/EcoStore.git
cd EcoStore
```

### 2. Install Dependencies
Install all necessary packages for both the backend and frontend:

**Backend:**
```bash
cd E-Commerce-Backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration
You need to set up environment variables for both services.

**Backend Setup:**
1. Navigate to `E-Commerce-Backend`.
2. Copy `.env.example` to `.env`.
3. Update `.env` with your MySQL credentials and JWT secrets.
   ```bash
   cp .env.example .env
   ```

**Frontend Setup:**
1. Navigate to `frontend`.
2. Create or verify the `.env` file (if configuration is needed).

### 4. Database Setup
1. Create a new MySQL database (e.g., `ecommerce_db`).
2. The schema files are located in `E-Commerce-Backend/docs/database/schema/`.
3. Run the seed script to populate the database with initial data:
   ```bash
   cd E-Commerce-Backend
   npm run seed
   ```

### 5. Running the Application

#### Automatic Startup (Windows Only)
You can use the provided PowerShell script to start everything at once:
```powershell
.\start-app.ps1
```
*Note: This script will attempt to start the MySQL service, install missing dependencies, and open the app in your browser.*

#### Manual Startup
If you prefer to start the services manually:

**Start Backend:**
```bash
cd E-Commerce-Backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm start
```

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, MySQL, JWT, Joi
- **Frontend**: React, Vite, Tailwind CSS
- **Design**: Modern UI

## 🤝 Contributing
Contributions are welcome! Please fork the repo and submit a pull request.

## 📝 License
This project is licensed under the ISC License.
