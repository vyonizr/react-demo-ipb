import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import './style.css'

import Button from '../../components/Button'

// const DUMMY_TODOS = [
//   {
//     id: nanoid(),
//     content: 'Belajar React',
//     isCompleted: false
//   }
// ]

function Home() {
  // const [newTodo, setNewTodo] = useState('')
  const [newTodo, setNewTodo] = useState({
    value: '',
    error: ''
  })

  // const [todos, setTodos] = useState(DUMMY_TODOS)
  const [todos, setTodos] = useState([])
  const [quote, setQuote] = useState({
    message: '',
    author: ''
  })

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch('https://api.quotable.io/quotes/random')
        const [data] = await response.json()
        const { content, author } = data
        setQuote({
          message: content,
          author
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchQuote()
  }, []);

  function handleChange(event) {
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
      <Helmet>
        <title>Home | Todo App</title>
      </Helmet>
      <h1>Todo App</h1>
      {
        quote.message.length > 0 ? (
          <>
            <p style={{ fontStyle: 'italic' }}>{quote.message}</p>
            <p style={{ textAlign: 'right' }}>- {quote.author}</p>
          </>
        ) : null
      }
      <div className='input-wrapper'>
        <input type='text' onChange={event => handleChange(event)} value={newTodo.value} placeholder='Isi todo di sini' style={{ padding: '8px 4px' }} />
        <Button onClick={() => createNewTodo()} style={{ marginLeft: '0.5rem' }}>Create</Button>
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
        ) : <p style={{ marginTop: '32px' }}>Empty!</p>
      }
      <Link to='/about' style={{ marginTop: '1rem' }}>About</Link>
    </>
  );
}

export default Home