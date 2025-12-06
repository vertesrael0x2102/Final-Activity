import React, { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ taskText, setTaskText, addTask }) {
    // 1. State to track the user's priority selection
    const [priority, setPriority] = useState('Medium'); 
    
    // 2. Handle Submission: MUST pass the selected priority
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- CRITICAL FIX ---
        // Call the hook function and pass the 'priority' state variable.
        addTask(priority); 
        
        // Reset the form inputs
        setTaskText(''); 
        setPriority('Medium');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="New"
            />
            
            {/* 3. Priority Dropdown: Updates the local 'priority' state */}
            <select
                className="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <button type="submit">Add Task (C)</button>
        </form>
    );
}