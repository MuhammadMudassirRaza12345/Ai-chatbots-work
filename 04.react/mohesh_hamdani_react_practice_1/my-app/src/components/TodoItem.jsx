import React from 'react'

export const TodoItems = ({todo}) => {
    return (
         <>
        <div className='container'>
           <h4 >{todo?.title}</h4>
           <p>{todo?.desc}</p>

            <button className="btn btn-sm btn-danger">Delete</button>

           {/* <button className="btn btn-sm btn-danger">Delete</button>  */}
        </div>
        </>
        
         
    )
}
