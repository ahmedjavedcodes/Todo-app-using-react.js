import React from 'react'
import { fetchTodos } from '../fetchData';
import { useState, useEffect } from 'react';

const Todo = () => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState()
    const [isCompleted, setIsCompleted] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getTodos = async () => {
            try {
                let todos = await fetchTodos();
                console.log(todos)
                setTodos(todos);

            }
            catch (error) {
                console.log(error)
                setError(error)
            }
            finally {
                setLoading(false)
            }
        }

        getTodos();
    }, [])

    const handleSubmit = () => {
        if (!todo || todo.trim() == "") {
            return;
        }
        else {
            setTodos([...todos, { id: Date.now(), title: todo, completed: false }])
            setTodo("")
        }
    }

    const handleDelete = (id) => {
        let updatedTodos = todos.filter((todo) => (todo.id !== id))
        setTodos(updatedTodos)
    }

    const handleCheck = (id) => {
        let updatedTodos = todos.map((todo) => (
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
        setTodos(updatedTodos);
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(savedTodos);
    }, []);

    return (
        <div>
            <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
                </div>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Add a todo"
                        value={todo || ""}
                        onChange={(e) => setTodo(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                    >
                        Add Task
                    </button>
                </div>
                {/* todos list */}
                <ul className="space-y-3">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm hover:bg-gray-100 transition"
                        >
                            <span
                                className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"
                                    }`}
                            >
                                {todo.title}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleCheck(todo.id)}
                                    className={`px-3 py-1 rounded text-white ${todo.completed ? "bg-green-400 hover:bg-green-500" : "bg-gray-400 hover:bg-gray-500"
                                        } transition`}
                                >
                                    {todo.completed ? "Done" : "Check"}
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Todo
