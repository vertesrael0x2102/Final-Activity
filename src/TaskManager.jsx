import React from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import './TaskManager.css';


export default function TaskManager() {
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
        <div className="app-layout"> 
            
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
                <h1>Task Manager</h1>

                <TaskForm 
                    taskText={taskText} 
                    setTaskText={setTaskText} 
                    addTask={addTask} 
                />

                <hr />

                {/* Bulk Action Control Panel */}
                {selectedTaskIds.length > 0 && (
                    <div className="bulk-actions-panel">
                        <p>{selectedTaskIds.length} tasks selected:</p>
                        <button onClick={() => handleBulkAction('complete')} className="bulk-complete-btn">
                            Mark Complete
                        </button>
                        <button onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${selectedTaskIds.length} selected tasks?`)) {
                                handleBulkAction('delete');
                            }
                        }} className="bulk-delete-btn">
                            Delete Selected
                        </button>
                        <button onClick={clearSelections} className="bulk-clear-btn">
                            Clear Selection
                        </button>
                    </div>
                )}

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
    );
}