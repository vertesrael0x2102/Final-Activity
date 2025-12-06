const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        // Create tasks table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            priority TEXT DEFAULT 'Medium'
        )`);
    }
});

// Routes

// GET /api/tasks - Get all tasks
app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks ORDER BY id DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// POST /api/tasks - Add a new task
app.post('/api/tasks', (req, res) => {
    const { text, priority = 'Medium' } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Task text is required' });
    }

    db.run('INSERT INTO tasks (text, priority) VALUES (?, ?)', [text, priority], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, text, completed: false, priority });
    });
});

// PUT /api/tasks/:id - Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed, priority } = req.body;

    let query = 'UPDATE tasks SET ';
    const params = [];
    const updates = [];

    if (text !== undefined) {
        updates.push('text = ?');
        params.push(text);
    }
    if (completed !== undefined) {
        updates.push('completed = ?');
        params.push(completed ? 1 : 0);
    }
    if (priority !== undefined) {
        updates.push('priority = ?');
        params.push(priority);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    query += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    db.run(query, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});
