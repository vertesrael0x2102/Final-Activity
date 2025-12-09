import React, { useState } from 'react';
import './TaskList.css';

export default function TaskList({
    sortedAndFilteredTasks,
    toggleComplete,
    saveEdit,
    deleteTask,
    updatePriority,
    selectedTaskIds,
    toggleSelect
}) {
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [editingPriority, setEditingPriority] = useState('');

    const getStars = (priority) => {
        if (priority === 'High') return 3;
        if (priority === 'Medium') return 2;
        return 1;
    };

    const getStarColor = (priority) => {
        if (priority === 'High') return '#ef4444'; // red
        if (priority === 'Medium') return '#f59e0b'; // orange
        return '#3b82f6'; // blue
    };

    const getPriorityFromStars = (stars) => {
        if (stars === 3) return 'High';
        if (stars === 2) return 'Medium';
        return 'Low';
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setEditingText(task.text);
        setEditingPriority(task.priority);
    };

    const handleSave = (id) => {
        if (editingText.trim() === '') return;
        saveEdit(id, editingText, editingPriority);
        setEditingId(null);
    };

    return (
        <div>
            <hr /> 

            <ul>
                {sortedAndFilteredTasks.map(task => (
                    <li
                        key={task.id}
                        className={task.completed ? 'completed' : ''}
                        onClick={() => toggleSelect(task.id)}
                        style={{ cursor: 'pointer' }}
                    >

                        {/* Checkboxes at the top */}
                        <div className="task-checkboxes" onClick={(e) => e.stopPropagation()}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTaskIds.includes(task.id)}
                                    onChange={() => toggleSelect(task.id)}
                                />
                                Select
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(task.id)}
                                />
                                Done
                            </label>
                        </div>

                        {editingId === task.id ? (
                            // Editing Mode
                            <div className="task-editing" onClick={(e) => e.stopPropagation()}>
                                <select
                                    className="priority-select"
                                    value={editingPriority}
                                    onChange={(e) => setEditingPriority(e.target.value)}
                                >
                                    <option value="High">🔥 High</option>
                                    <option value="Medium">-- Medium</option>
                                    <option value="Low">-- Low</option>
                                </select>

                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                />

                                <div className="task-actions">
                                    <button onClick={() => handleSave(task.id)}>Save</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            // Display Mode
                            <div className="task-content">
                                <div className="task-header">
                                    <div className="difficulty-stars">
                                        {Array.from({ length: getStars(task.priority) }, (_, i) => (
                                            <span
                                                key={i}
                                                className="star"
                                                style={{ color: getStarColor(task.priority) }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="task-text">
                                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                        {task.text}
                                    </span>
                                </div>

                                <div className="task-status">
                                    Status: {task.completed ? 'Done' : 'Active'}
                                </div>

                                <div className="task-actions" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => startEdit(task)}>Edit</button>
                                    <button onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this task?')) {
                                            deleteTask(task.id);
                                        }
                                    }}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}