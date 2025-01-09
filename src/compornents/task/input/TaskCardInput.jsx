import React from 'react'

export const TaskCardInput = (inputText, setInputText, setTaskList, taskList) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
      setInputText(e,EventTarget.value);
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
           <input type="text" placeholder='add a task' className='taskAddInput' onChange={handleChange}/>
        </form>
    </div>
  )
}
