import React from 'react';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import './TodoList.css';

const TodoList = ({ todos, removeTodo, completeTodo }) => {
    return (
        <div>
            {todos.length === 0 && <h4 className="mt-4">No tasks, add a task</h4>}
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center todo-item"
                    >
                        {todo.text}
                        <div className="icons">
                            <FaCheck
                                className="icon check-icon"
                                onClick={() => completeTodo(index)}
                            />
                            <FaTrashAlt
                                className="icon trash-icon"
                                onClick={() => removeTodo(index)}
                            />
                        </div>
                    </li>
                ))}
                {todos.length > 0 && (
                    <li className="list-group-item d-flex justify-content-between align-items-center tasks-info">
                        {todos.length} {todos.length === 1 ? 'task' : 'tasks'} to complete
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TodoList;
