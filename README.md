# 🧵 TexFlow CRM

A full-stack CRM (Customer Relationship Management) system built for textile businesses to manage customers, products, inventory, orders, invoices, and sales analytics.

🌐 **Live Demo:** https://texflow-crm-frontend.onrender.com

🔗 **Backend API:** https://texflow-crm.onrender.com

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control (Admin / Sales Executive)

### 👥 Customer Management
- Add Customer
- Update Customer
- Delete Customer
- Search Customers

### 📦 Product Management
- Add Products
- Update Products
- Delete Products
- Stock Tracking

### 🛒 Order Management
- Create Orders
- Edit Orders
- Delete Orders
- Automatic Inventory Update

### 📊 Dashboard
- Total Customers
- Total Products
- Total Orders
- Revenue
- Inventory Value
- Pending Orders
- Low Stock Products

### 📈 Sales Reports
- Monthly Revenue Chart
- Top Selling Products
- Business Statistics

### 🧾 Invoice Generation
- Professional Invoice
- GST Calculation
- PDF Download
- Print Invoice

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Recharts
- jsPDF
- CSS

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

## Database
- MongoDB Atlas
- Mongoose

## Deployment
- Frontend → Render Static Site
- Backend → Render Web Service
- Database → MongoDB Atlas

---

# 📸 Screenshots

## Login

(Add Screenshot Here)

---

## Dashboard

(Add Screenshot Here)

---

## Customers

(Add Screenshot Here)

---

## Products

(Add Screenshot Here)

---

## Orders

(Add Screenshot Here)

---

## Sales Reports

(Add Screenshot Here)

---

## Invoice

(Add Screenshot Here)

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Slayer04git/TexFlow-CRM.git
```

Go into the project

```bash
cd TexFlow-CRM
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the backend folder

```env
PORT=8000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend

```bash
cd backend
npm run dev
```

Run Frontend

```bash
cd frontend
npm run dev
```

---

# 📁 Project Structure

```
TexFlow-CRM
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── layouts
│   │   └── styles
│   └── public
│
└── README.md
```

---

# 📚 Future Improvements

- Email Notifications
- Customer Payment Tracking
- Purchase Management
- Supplier Management
- Advanced Analytics
- Export Reports to Excel
- Barcode Support

---

# 👨‍💻 Author

**Parth Randar**

GitHub:
https://github.com/Slayer04git

---

⭐ If you like this project, don't forget to give it a star!
