import React, { useState, useEffect } from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import TaskModal from './components/TaskModal';
import './TaskManager.css';

export default function TaskManager() {
    const [theme, setTheme] = useState('light');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const {
        taskText,
        setTaskText,
        addTask,
        toggleComplete,
        saveEdit,
        deleteTask,
        updatePriority, // <-- 1. NEWLY DESTRUCTURED FUNCTION
        filter,
        setFilter,
        sortMethod,
        setSortMethod,
        sortedAndFilteredTasks,
        // Filter counts
        allCount,
        activeCount,
        completedCount,
        // Bulk actions
        selectedTaskIds,
        toggleSelect,
        handleBulkAction,
        clearSelections,
    } = useTaskManager();

    return (
        <div className="app-container">
            {/* Header */}
            <header className="app-header">
                <h1>TASK MANAGER</h1>
                {/* Theme Toggle Button */}
                <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </header>

            <div className="dashboard">
                {/* 1. SIDEBAR COLUMN */}
                <nav className="sidebar">
                    <FilterControls
                        filter={filter}
                        setFilter={setFilter}
                        sortMethod={sortMethod}
                        setSortMethod={setSortMethod}
                        allCount={allCount}
                        activeCount={activeCount}
                        completedCount={completedCount}
                    />
                </nav>

                {/* 2. MAIN CONTENT COLUMN */}
                <main className="main-content">

                <button onClick={openModal} className="new-task-btn">New Task</button>

                <hr />

                <h2>Tasks ({sortedAndFilteredTasks.length} shown)</h2>

                <TaskList
                    sortedAndFilteredTasks={sortedAndFilteredTasks}
                    toggleComplete={toggleComplete}
                    saveEdit={saveEdit}
                    deleteTask={deleteTask}
                    updatePriority={updatePriority} // <-- 2. NEWLY PASSED PROP
                    selectedTaskIds={selectedTaskIds}
                    toggleSelect={toggleSelect}
                />
            </main>
            </div>

            {/* Floating Bulk Actions Bar */}
            {selectedTaskIds.length > 0 && (
                <div className="floating-actions-bar">
                    <div className="actions-content">
                        <span className="selection-text">
                            {selectedTaskIds.length === 1 ? '1 task selected' : `${selectedTaskIds.length} tasks selected`}
                        </span>
                        <div className="actions-buttons">
                            <button
                                onClick={() => handleBulkAction('complete')}
                                className="action-btn complete-btn"
                            >
                                Mark Complete
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${selectedTaskIds.length} selected tasks?`)) {
                                        handleBulkAction('delete');
                                    }
                                }}
                                className="action-btn delete-btn"
                            >
                                Delete Selected
                            </button>
                            <button
                                onClick={clearSelections}
                                className="action-btn clear-btn"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                taskText={taskText}
                setTaskText={setTaskText}
                addTask={addTask}
            />
        </div>
    );
}
