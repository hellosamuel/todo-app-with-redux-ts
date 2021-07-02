import React from 'react'
import useTodos from '../hooks/useTodos'
import TodoItem from './TodoItem'

function TodoList() {
  const todos = useTodos()

  if (!todos.length) return <p>No Todos.</p>

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}

export default TodoList
