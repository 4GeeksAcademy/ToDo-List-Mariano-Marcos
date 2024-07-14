import React, { useState, useEffect } from 'react';
import InputComponent from './InputComponent';
import TodoList from './TodoList';
import CompletedTasks from './CompletedTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);
    const username = 'mariano';

    const fetchTasks = () => {
        fetch(`https://playground.4geeks.com/todo/users/${username}`)
            .then(resp => resp.json())
            .then(data => {
                const pendingTodos = data.todos.filter(todo => !todo.is_done);
                const completedTodos = data.todos.filter(todo => todo.is_done);
                setTodos(pendingTodos);
                setCompleteTodos(completedTodos);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.result === 'ok') {
                fetchTasks();
            } else {
                console.error('Error creating user:', data);
                fetchTasks();
            }
        })
        .catch(error => console.error(error));
    }, []);

    const addTodo = (todo) => {
        const formattedTodo = { label: todo, is_done: false };
        fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
            method: "POST",
            body: JSON.stringify(formattedTodo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.msg === 'Missing user') {
                // User needs to be recreated
                fetch(`https://playground.4geeks.com/todo/users/${username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(resp => resp.json())
                .then(userCreationData => {
                    if (userCreationData.result === 'ok') {
                        // User recreated, retry adding the todo
                        fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
                            method: "POST",
                            body: JSON.stringify(formattedTodo),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then(resp => resp.json())
                        .then(newData => {
                            const newTodos = [...todos, newData];
                            setTodos(newTodos);
                        })
                        .catch(error => console.error(error));
                    } else {
                        console.error('Error recreating user:', userCreationData);
                    }
                })
                .catch(error => console.error(error));
            } else {
                // Successfully added todo
                const newTodos = [...todos, data];
                setTodos(newTodos);
            }
        })
        .catch(error => console.error(error));
    };

    const removeTodo = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            const newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
        })
        .catch(error => console.error(error));
    };

    const completeTodo = (id) => {
        const updatedTodo = todos.find(todo => todo.id === id);
        if (updatedTodo) {
            updatedTodo.is_done = true;

            fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTodo)
            })
            .then(resp => resp.json())
            .then(() => {
                const newTodos = todos.filter(todo => todo.id !== id);
                setTodos(newTodos);
                setCompleteTodos([...completeTodos, updatedTodo]);
            })
            .catch(error => console.error(error));
        }
    };

    const uncompleteTodo = (id) => {
        const updatedTodo = completeTodos.find(todo => todo.id === id);
        if (updatedTodo) {
            updatedTodo.is_done = false;

            fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTodo)
            })
            .then(resp => resp.json())
            .then(() => {
                const newCompleteTodos = completeTodos.filter(todo => todo.id !== id);
                setCompleteTodos(newCompleteTodos);
                setTodos([...todos, updatedTodo]);
            })
            .catch(error => console.error(error));
        }
    };

    const clearAllTodos = async () => {
        try {
            // Fetch all tasks
            const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
            const data = await response.json();
            
            // Get all task IDs
            const taskIds = data.todos.map(todo => todo.id);
            
            // Delete each task
            await Promise.all(taskIds.map(id => 
                fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                    method: "DELETE"
                })
            ));
            
            // Clear the state
            setTodos([]);
            setCompleteTodos([]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async () => {
        try {
            // Delete the user
            const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log("User eliminated");
                // Clear all tasks from the frontend
                setTodos([]);
                setCompleteTodos([]);
                // Use a setTimeout to ensure the state update has occurred before showing the alert
                setTimeout(() => {
                    // Alert the user to refresh the page
                    alert('User deleted successfully. Please refresh the page to start again.');
                }, 0);
            } else {
                console.log('error: ', response.status, response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className="container text-center mt-5 app">
            <h1>Todo List</h1>
            <InputComponent addTodo={addTodo} />
            <TodoList todos={todos} removeTodo={removeTodo} completeTodo={completeTodo} />
            <CompletedTasks completeTodos={completeTodos} uncompleteTodo={uncompleteTodo} />
            <button className="btn btn-danger mt-3" onClick={clearAllTodos}>Clear All Tasks</button>
            <h5></h5>
            <button className='btn btn-danger mt-3' onClick={deleteUser}>Delete User</button>
            <p className='mt-2'>
                Made by {"Mariano "}
                <a href="http://www.4geeksacademy.com">@4Geeks Academy</a>, with love!
            </p>
        </div>
    );
};

export default Home;
