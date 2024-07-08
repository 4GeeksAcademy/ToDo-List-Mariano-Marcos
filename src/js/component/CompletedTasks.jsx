import React from 'react';
import { FaUndo } from 'react-icons/fa';
import './CompletedTasks.css';

const CompletedTasks = ({ completeTodos, uncompleteTodo }) => {
    return (
        <div>
            {completeTodos.length > 0 && <h4 className="mt-4">Completed Tasks</h4>}
            <ul className="list-group">
                {completeTodos.map((completeTodo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center completed-todo-item">
                        {completeTodo.text}
                        <FaUndo className="undo-icon" onClick={() => uncompleteTodo(index)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTasks;
