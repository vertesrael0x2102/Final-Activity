
# Task Manager - CRUD Application

A full-stack task management application built with React frontend and Node.js backend, featuring complete CRUD operations with SQLite database persistence.

## 🚀 Features

- ✅ **Create** - Add new tasks with priority levels
- ✅ **Read** - View all tasks with filtering and sorting
- ✅ **Update** - Edit task details, mark as complete, change priority
- ✅ **Delete** - Remove tasks individually or in bulk
- 🎨 **Modern UI** - Clean, responsive React interface
- 🔄 **Real-time Sync** - Data consistency across all interfaces
- 📱 **Multiple Interfaces** - Web UI, REST API, and CLI tool
- 🎯 **Priority Management** - Low, Medium, High priority levels
- 🔍 **Filtering & Sorting** - Filter by completion status, sort by various criteria
- 📦 **Bulk Operations** - Select and manage multiple tasks at once

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS Modules** - Component-scoped styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API
- **SQLite3** - Lightweight relational database
- **CORS** - Cross-origin resource sharing

### Additional Tools
- **Python** - CLI database management tool
- **ESLint** - Code linting
- **Vite** - Development and build tooling

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python 3.x (for CLI tool)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-crud-app.git
   cd my-crud-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

## 🎯 Usage

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # or for development: node server.js
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the application**
   - Open `http://localhost:5173` in your browser
   - Start managing your tasks!

### Using the CLI Tool

The Python CLI tool provides direct database access:

```bash
cd backend
python query_db.py
```

Available options:
- View all tasks
- Add new tasks
- Update existing tasks
- Delete tasks

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### GET /api/tasks
Retrieve all tasks
```bash
curl http://localhost:5000/api/tasks
```

#### POST /api/tasks
Create a new task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "New task", "priority": "High"}'
```

#### PUT /api/tasks/:id
Update a task
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated task", "completed": true}'
```

#### DELETE /api/tasks/:id
Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

### Response Format
```json
{
  "id": 1,
  "text": "Sample task",
  "completed": false,
  "priority": "Medium"
}
```

## 📁 Project Structure

```
my-crud-app/
├── backend/                 # Node.js backend
│   ├── server.js           # Express server
│   ├── query_db.py         # Python CLI tool
│   ├── tasks.db            # SQLite database
│   └── package.json
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   │   ├── TaskForm.jsx    # Task creation form
│   │   ├── TaskList.jsx    # Task display list
│   │   └── FilterControls.jsx # Filtering UI
│   ├── hooks/              # Custom React hooks
│   │   └── useTaskManager.js # Task management logic
│   └── App.jsx             # Main app component
├── public/                 # Static assets
├── package.json            # Frontend dependencies
└── README.md              # This file
```

## 🎨 Features in Detail

### Task Management
- **Add Tasks**: Click "Add Task" or press Enter in the input field
- **Edit Tasks**: Click the edit icon next to any task
- **Complete Tasks**: Click the checkbox to toggle completion
- **Delete Tasks**: Click the delete icon (with confirmation)
- **Priority Levels**: Set Low, Medium, or High priority

### Advanced Features
- **Filtering**: Filter by All, Active, or Completed tasks
- **Sorting**: Sort by ID, Text, Priority, or Completion status
- **Bulk Actions**: Select multiple tasks for batch operations
- **Real-time Updates**: Changes reflect immediately across all interfaces

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm start` - Start production server
- `node server.js` - Start development server

### Database Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    priority TEXT DEFAULT 'Medium'
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Node.js](https://nodejs.org/)
- Database by [SQLite](https://sqlite.org/)
- Styled with modern CSS

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

---

**Happy task managing! 🎯**
