// rafc
import React from 'react'
import { TodoItems } from '../components/TodoItem'

export const Todos = (props) => {
  return (
  
    <div className="container">
      <h3 className="text-center my-3">Todos list</h3>
     
      <TodoItems todo={props.todos[0] } />


    </div>
    
  )
  
}
