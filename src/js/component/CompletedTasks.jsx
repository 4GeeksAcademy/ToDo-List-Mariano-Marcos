import React from 'react';
import { FaUndo } from 'react-icons/fa';
import './CompletedTasks.css';

const CompletedTasks = ({ completeTodos, uncompleteTodo }) => {
    return (
        <div>
            {completeTodos.length > 0 && <h4 className="mt-4">Completed Tasks</h4>}
            <ul className="list-group">
                {completeTodos.map((completeTodo) => (
                    <li key={completeTodo.id} className="list-group-item d-flex justify-content-between align-items-center completed-todo-item">
                        {completeTodo.label}
                        <FaUndo className="undo-icon" onClick={() => uncompleteTodo(completeTodo.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTasks;
