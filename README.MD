# Blog Editor

A modern blog editor with auto-save, draft/publish workflow, and a clean UI.

## Features

- Create, edit, auto-save, publish, and delete blogs
- Draft and published blog separation with tab navigation
- Tag support with pill-style display
- Responsive, modern UI (Tailwind CSS)
- Toast notifications for all actions
- MongoDB backend with RESTful API

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** dotenv, CORS

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Krushna-WebDev/blog-editor.git
cd blog-editor
```

### 2. Backend Setup

```bash
cd backend
npm install
# Set up your MongoDB connection in .env
echo "MONGO_URI=mongodb://localhost:27017/blog-editor" > .env
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
# Set up API URL in .env
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```

### 4. Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Create, edit, and manage your blogs!

## Folder Structure

```
backend/
  controller/
  models/
  routes/
  index.js
frontend/
  src/
    components/
    pages/
    App.jsx
  .env
```

## License

MIT
