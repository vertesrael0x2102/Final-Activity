import sqlite3

def connect_db():
    return sqlite3.connect('./tasks.db')

def get_all_tasks():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tasks ORDER BY id DESC')
    tasks = cursor.fetchall()
    conn.close()
    return tasks

def add_task(text, priority='Medium'):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (text, priority) VALUES (?, ?)', (text, priority))
    task_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return task_id

def update_task(task_id, text=None, completed=None, priority=None):
    conn = connect_db()
    cursor = conn.cursor()
    updates = []
    params = []
    if text is not None:
        updates.append('text = ?')
        params.append(text)
    if completed is not None:
        updates.append('completed = ?')
        params.append(1 if completed else 0)
    if priority is not None:
        updates.append('priority = ?')
        params.append(priority)
    if updates:
        query = f'UPDATE tasks SET {", ".join(updates)} WHERE id = ?'
        params.append(task_id)
        cursor.execute(query, params)
        conn.commit()
    conn.close()

def delete_task(task_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    while True:
        print("\nOptions:")
        print("1. View all tasks")
        print("2. Add a new task")
        print("3. Update a task")
        print("4. Delete a task")
        print("5. Exit")
        
        choice = input("Choose an option (1-5): ").strip()
        
        if choice == '1':
            tasks = get_all_tasks()
            if tasks:
                print("All tasks:")
                for task in tasks:
                    print(f"ID: {task[0]}, Text: {task[1]}, Completed: {task[2]}, Priority: {task[3]}")
            else:
                print("No tasks found.")
        
        elif choice == '2':
            text = input("Enter task text: ").strip()
            priority = input("Enter priority (Low, Medium, High): ").strip() or 'Medium'
            task_id = add_task(text, priority)
            print(f"Task added with ID: {task_id}")
        
        elif choice == '3':
            try:
                task_id = int(input("Enter task ID to update: ").strip())
                text = input("Enter new text (leave blank to keep current): ").strip() or None
                completed_input = input("Mark as completed? (y/n, leave blank to keep current): ").strip().lower()
                completed = True if completed_input == 'y' else False if completed_input == 'n' else None
                priority = input("Enter new priority (leave blank to keep current): ").strip() or None
                update_task(task_id, text, completed, priority)
                print("Task updated successfully.")
            except ValueError:
                print("Invalid task ID.")
        
        elif choice == '4':
            try:
                task_id = int(input("Enter task ID to delete: ").strip())
                delete_task(task_id)
                print("Task deleted successfully.")
            except ValueError:
                print("Invalid task ID.")
        
        elif choice == '5':
            print("Exiting...")
            break
        
        else:
            print("Invalid option. Please choose 1-5.")
