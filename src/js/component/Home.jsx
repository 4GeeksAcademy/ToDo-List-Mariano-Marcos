import React, { useState } from 'react';
import InputComponent from './InputComponent';
import TodoList from './TodoList';
import CompletedTasks from './CompletedTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

//contains all components and major functionalities of the todo list app

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([...todos, { text: todo }]);
    };

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const completeTodo = (index) => {
        const newCompletedTask = todos[index].text;
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        setCompleteTodos([...completeTodos, { text: newCompletedTask }]);
    };

    const uncompleteTodo = (index) => {
        const uncompletedTask = completeTodos[index].text;
        const newCompletedTodos = completeTodos.filter((_, i) => i !== index);
        setCompleteTodos(newCompletedTodos);
        setTodos([...todos, { text: uncompletedTask }]);
    };

    return (
        <div className="container text-center mt-5 app">
            <h1>Todo List</h1>
            <InputComponent addTodo={addTodo} />
            <TodoList todos={todos} removeTodo={removeTodo} completeTodo={completeTodo} />
            <CompletedTasks completeTodos={completeTodos} uncompleteTodo={uncompleteTodo} />
            <p className='mt-2'>
                Made by {"Mariano "}
                <a href="http://www.4geeksacademy.com">@4Geeks Academy</a>, with love!
            </p>
        </div>
    );
};

export default Home;
