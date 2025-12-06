import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

// --- Helper Functions (Outside the hook) ---

const generateId = (tasks) => {
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    return maxId + 1;
};

// New helper to convert string priority to a sortable number (High=3, Medium=2, Low=1)
const getPriorityValue = (p) => {
    if (p === 'High') return 3;
    if (p === 'Medium') return 2;
    return 1;
};

// --- Custom Hook (useTaskManager) ---

export function useTaskManager() {
    // Core State
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Feature State
    const [filter, setFilter] = useState('all');
    // NOTE: We will add 'priority_desc' to the sortMethod options later
    const [sortMethod, setSortMethod] = useState('default');

    // Bulk Actions State
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    // --- R: Read (Initial Load) ---
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/tasks`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const tasks = await response.json();
                setTasks(tasks);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching tasks:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);



    // --- C: Create (Add Task) - UPDATED to accept priority ---
    const addTask = async (priority = 'Medium') => { // Set 'Medium' as default fallback
        if (taskText.trim() === '') return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: taskText.trim(),
                    priority: priority
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            const newTask = await response.json();
            setTasks(prevTasks => [newTask, ...prevTasks]);
            setTaskText('');
        } catch (err) {
            setError(err.message);
            console.error('Error adding task:', err);
        } finally {
            setLoading(false);
        }
    };

    // --- U: Update (Toggle Completion Status, Save Edit) and D: Delete remain the same ---
    const toggleComplete = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !task.completed
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to toggle completion');
            }

            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            );
        } catch (err) {
            setError(err.message);
            console.error('Error toggling completion:', err);
        } finally {
            setLoading(false);
        }
    };

    const saveEdit = async (id, newText, newPriority) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newText.trim(),
                    priority: newPriority
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === id ? { ...t, text: newText.trim(), priority: newPriority } : t
                )
            );
        } catch (err) {
            setError(err.message);
            console.error('Error updating task:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (err) {
            setError(err.message);
            console.error('Error deleting task:', err);
        } finally {
            setLoading(false);
        }
    };

    // --- Update Priority ---
    const updatePriority = async (id, newPriority) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priority: newPriority
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update priority');
            }

            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === id ? { ...t, priority: newPriority } : t
                )
            );
        } catch (err) {
            setError(err.message);
            console.error('Error updating priority:', err);
        } finally {
            setLoading(false);
        }
    };

    // --- Bulk Actions ---
    const toggleSelect = (id) => {
        setSelectedTaskIds(prev =>
            prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
        );
    };

    const handleBulkAction = async (action) => {
        setLoading(true);
        setError(null);
        try {
            if (action === 'complete') {
                // Update each selected task to completed
                const updatePromises = selectedTaskIds.map(id =>
                    fetch(`${API_BASE_URL}/tasks/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ completed: true }),
                    })
                );
                await Promise.all(updatePromises);
                setTasks(prevTasks =>
                    prevTasks.map(t =>
                        selectedTaskIds.includes(t.id) ? { ...t, completed: true } : t
                    )
                );
            } else if (action === 'delete') {
                // Delete each selected task
                const deletePromises = selectedTaskIds.map(id =>
                    fetch(`${API_BASE_URL}/tasks/${id}`, {
                        method: 'DELETE',
                    })
                );
                await Promise.all(deletePromises);
                setTasks(prevTasks => prevTasks.filter(t => !selectedTaskIds.includes(t.id)));
            }
            setSelectedTaskIds([]);
        } catch (err) {
            setError(err.message);
            console.error('Error performing bulk action:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearSelections = () => {
        setSelectedTaskIds([]);
    };

    // --- Combined Filtering and Sorting Logic (UPDATED for Priority Sort) ---
    // Use .slice() to create a copy before filtering/sorting if tasks is meant to be immutable
    // However, since we chain filter and sort, we can just use the spread operator on tasks.
    const sortedAndFilteredTasks = [...tasks]
        // 1. FILTERING
        .filter(task => {
            if (filter === 'active') {
                return !task.completed;
            }
            if (filter === 'completed') {
                return task.completed;
            }
            return true; // filter === 'all'
        })
        // 2. SORTING
        .sort((a, b) => {
            // NEW PRIORITY SORTING LOGIC
            if (sortMethod === 'priority_desc') {
                return getPriorityValue(b.priority) - getPriorityValue(a.priority); // High to Low
            }
            
            if (sortMethod === 'text_asc') {
                return a.text.localeCompare(b.text);
            }
            if (sortMethod === 'text_desc') {
                return b.text.localeCompare(a.text);
            }
            if (sortMethod === 'completed_desc') {
                // Places completed tasks at the bottom (true = 1, false = 0)
                return a.completed - b.completed; 
            }
            // Default: Keep original order (or sort by ID if you track it)
            return 0; 
        });

    return {
        // Core data
        tasks,
        taskText,
        setTaskText,

        // CRUD functions (Updated addTask)
        addTask,
        toggleComplete,
        saveEdit,
        deleteTask,
        updatePriority,

        // Feature data & functions
        filter,
        setFilter,
        sortMethod,
        setSortMethod,
        sortedAndFilteredTasks, // The final list to render

        // Bulk actions
        selectedTaskIds,
        toggleSelect,
        handleBulkAction,
        clearSelections,
    };
}