import React, { useState } from 'react';

const InputComponent = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        } else {
            alert('The input cannot be empty');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter your task here"
                onChange={e => setInputValue(e.target.value)}
                value={inputValue}
                onKeyPress={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
        </div>
    );
};

export default InputComponent;
