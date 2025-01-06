import React from 'react'

export const TaskCardInput = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
           <input type="text" placeholder='add a task' className='taskAddInput'/>
        </form>
    </div>
  )
}
