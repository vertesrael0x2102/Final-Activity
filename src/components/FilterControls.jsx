import React from 'react';
import './FilterControls.css';

const FilterControls = ({ filter, setFilter, sortMethod, setSortMethod, allCount, activeCount, completedCount }) => (
    <aside className="sidebar-filters">
        <h3>View Options</h3>

        {/* Filter Buttons */}
        <div className="filter-controls">
            {['all', 'active', 'completed'].map(f => {
                const count = f === 'all' ? allCount : f === 'active' ? activeCount : completedCount;
                return (
                    <button
                        key={f}
                        className={filter === f ? 'active-filter' : ''}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)} ({count})
                    </button>
                );
            })}
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-controls">
            <label htmlFor="sort-by">Sort By:</label>
            <select
                id="sort-by"
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="priority_desc">Priority (High-Low)</option> {/* Updated option */}
                <option value="text_asc">Name (A-Z)</option>
                <option value="text_desc">Name (Z-A)</option>
                <option value="completed_desc">Completed</option>
            </select>
        </div>
    </aside>
);

export default FilterControls;
