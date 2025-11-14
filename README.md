# Inventory Management System

A full-stack inventory management application built with React.js, Node.js (Express), and MongoDB. The system supports full CRUD operations, backend validation, and a responsive user interface suitable for real-world usage.

---

## Table of Contents
1. Project Overview
2. Prerequisites
3. Project Setup Instructions
4. System Architecture
5. API Documentation
6. Using the Inventory Management System
7. Folder Structure
8. Database Schema
9. Code Comments & Key Logic
10. Production Build
11. Troubleshooting
12. Disclaimer

---

## 1. Project Overview

This application allows users to:
- View all inventory items
- Add items
- Edit existing items
- Delete items with confirmation
- View detailed item info
- Filter items by category

Frontend:
- React.js
- React Router
- Tailwind CSS
- Context API

Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- Joi validation

---

## 2. Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB Atlas or local MongoDB instance

---

## 3. Project Setup Instructions

### Backend Setup
cd backend
npm install

Create `.env`:
MONGO_URI=your-mongodb-uri
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

Start backend:
npm run dev

### Frontend Setup
cd frontend
npm install

Optional `.env`:
REACT_APP_API_URL=http://localhost:5000/api

Start frontend:
npm start

Backend → http://localhost:5000/api  
Frontend → http://localhost:3000

---

## 4. System Architecture

Frontend:
- React components for UI
- Context API for state
- API calls via api.js
- Page routing using React Router

Backend:
- Express routes handle incoming requests
- Joi validates request bodies
- Controllers contain business logic
- Mongoose handles DB operations
- Centralized error handling

High-level flow:
React UI → Context → API Layer → Express Routes → Controllers → MongoDB

---

## 5. API Documentation

Base URL:
http://localhost:5000/api

### 1. Get All Items
GET /items
Optional:
?category=Electronics

Success:
200 OK
{ success: true, data: [...] }

---

### 2. Get Item by ID
GET /items/:id

Responses:
200 OK → item returned
400 → invalid ID
404 → item not found

---

### 3. Create Item
POST /items

Body:
{
  "itemName": "Laptop",
  "quantity": 10,
  "price": 999.99,
  "description": "High-performance laptop",
  "category": "Electronics"
}

Validations:
- itemName: letters/spaces only, required  
- price: number ≥ 0  
- quantity: integer ≥ 0  
- category: Electronics/Clothing/Furniture/Other  

Success:
201 Created

---

### 4. Update Item
PUT /items/:id  
Body same as Create.

Success:
200 OK

Errors:
400 → invalid data  
404 → item not found  

---

### 5. Delete Item
DELETE /items/:id

Success:
200 OK { message: "Item deleted successfully" }

Errors:
400 → invalid ID  
404 → not found  

---

### Error Response Format
{ success: false, message: "Error message" }

Common Codes:
200 OK  
201 Created  
400 Bad Request  
404 Not Found  
500 Internal Server Error  

---

## 6. Using the Inventory Management System

### Home Page
- Shows all items in table (desktop) or cards (mobile)
- Actions: View, Edit, Delete

### Add Item
Fields:
- Item Name (required)
- Price (required)
- Category (required)
- Quantity (optional)
- Description (optional)

Real-time client-side validation included.

### Edit Item
Loads existing data, validation same as Add.

### View Item
Shows complete details + timestamps.

### Delete Item
Prompts a confirmation modal before deletion.

### Responsive UI
Fully optimized for desktop, tablet, and mobile.

---

## 7. Folder Structure

Backend:
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js

Frontend:
frontend/
├── api/
├── components/
├── context/
├── routes/
├── styles/
├── App.jsx
└── index.js

---

## 8. Database Schema

Item Schema:
{
  itemName: String (required),
  quantity: Number (default 0, min 0),
  price: Number (required, min 0),
  description: String,
  category: String (enum),
  createdAt: Date,
  updatedAt: Date
}

Category options:
Electronics, Clothing, Furniture, Other

---

## 9. Code Comments & Key Logic

Comments added throughout:
- server.js: middleware, DB init, route setup
- routes/items.js: route definitions + validation
- controllers/itemsController.js: full CRUD logic
- models/Item.js: schema rules
- validateRequest.js: Joi validation handling
- errorhandler.js: standardized error responses
- ItemsContext.jsx: item state mgmt, API calls
- ItemForm.jsx: form validation & submission
- ItemList.jsx: UI conditional states

Comments aim to explain *why* and *how* logic is implemented for clarity.

---

## 10. Production Build

### Backend
Set production `.env`, then:
npm start

### Frontend
npm run build  
Deploy `/build` using Netlify, Vercel, or Nginx.

Deployment notes:
- Use production MongoDB
- Enable HTTPS
- Configure CORS properly
- Set REACT_APP_API_URL to production API

---

## 11. Troubleshooting

### Backend Not Connecting
- Verify MongoDB URI
- Check Atlas IP whitelist
- Ensure database credentials are correct

### CORS Errors
- FRONTEND_URL must match your actual frontend domain

### Items Not Loading
- Ensure both frontend and backend are running
- Check API URL in `.env`
- Inspect DevTools → Network tab

### Validation Errors
- Item name must be letters & spaces
- Price must be >= 0
- Category must be one of the valid enums

---

## 12. Disclaimer
This document is the sole property of WHIZLABS.  
Any use or duplication of this document without express permission is strictly forbidden.
