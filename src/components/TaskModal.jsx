import React from 'react';
import TaskForm from './TaskForm';
import './TaskModal.css';

export default function TaskModal({ isOpen, onClose, taskText, setTaskText, addTask }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <TaskForm
                    taskText={taskText}
                    setTaskText={setTaskText}
                    addTask={(priority) => {
                        addTask(priority);
                        onClose();
                    }}
                />
            </div>
        </div>
    );
}
