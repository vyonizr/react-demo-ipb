import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import Button from './components/Button'

const DUMMY_TODOS = [
  {
    id: nanoid(),
    content: 'Belajar React',
    isCompleted: false
  }
]

function App() {
  // const [newTodo, setNewTodo] = useState('')
  const [newTodo, setNewTodo] = useState({
    value: '',
    error: ''
  })

  const [todos, setTodos] = useState(DUMMY_TODOS)
  // const [todos, setTodos] = useState([])

  function handleChange(event) {
    console.log(event.target.value)
    // setNewTodo(event.target.value)
    setNewTodo({
      value: event.target.value,
      error: ''
    })
  }

  function createNewTodo() {
    if (newTodo.value.length === 0) {
      setNewTodo({
        ...newTodo,
        error: 'Todo tidak boleh kosong'
      })
    } else {
      const updatedTodos = [...todos]
      updatedTodos.push({
        id: nanoid(),
        content: newTodo.value,
        isCompleted: false,
      })

      setTodos(updatedTodos)
      setNewTodo({
        value: '',
        error: ''
      })
    }
  }

  function completeTodo(targetTodoId) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === targetTodoId) {
        todo.isCompleted = !todo.isCompleted
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  function clearCompletedTodos() {
    const updatedTodos = todos.filter(todo => {
      return todo.isCompleted === false
    })

    setTodos(updatedTodos)
  }

  function deleteTodo(targetTodoId) {
    const updatedTodos = todos.filter(todo => {
      return todo.id !== targetTodoId
    })

    setTodos(updatedTodos)
  }

  return (
    <>
      <h1>Todo App</h1>
      <div className='input-wrapper'>
        <input type='text' onChange={event => handleChange(event)} value={newTodo.value} placeholder='Isi todo di sini' style={{ padding: '8px 4px' }} />
        <Button onClick={() => createNewTodo()}>Create</Button>
      </div>
      {
        newTodo.error.length > 0 ? (
          <small style={{ color: 'red' }}>{newTodo.error}</small>
        ) : null
      }
      {
        todos.length > 0 ? (
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className="todo-item" >
                <input type='checkbox' onChange={() => completeTodo(todo.id)} style={{ height: '16px' }} />
                <p style={{ overflowWrap: 'break-word', textDecoration: todo.isCompleted ? 'line-through' : '' }}>{todo.content}</p>
                <button style={{ background: 'none', border: 'none' }} onClick={() => deleteTodo(todo.id)}>❌</button>
              </li>
            ))}
          </ul>
        ) : null
      }
      {
        todos.length > 0 ? (
          <Button onClick={() => clearCompletedTodos()} disabled={!todos.some(todo => { return todo.isCompleted })}>Clear Completed</Button>
        ) : <p style={{ marginTop: '32px' }}>Empty</p>
      }
    </>
  )
}

export default App
