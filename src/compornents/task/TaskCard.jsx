import React, { useState } from 'react'
import { TaskCardTitle } from './TaskCardTitle'
import { TaskCardDeleteButton } from './button/TaskCardDeleteButton'
import { TaskCardInput} from './input/TaskCardInput'
import { Tasks } from './Tasks'

export const TaskCard = () => { 
  const [inputText, setInputText] = useState("");
  const [taskList, setTaskList] = useState([]);

  return (
    <div className='taskCard'>
        <TaskCardTitle />
        <TaskCardDeleteButton />
        <TaskCardInput 
        inputText={inputText} 
        setInputText={setInputText} 
        setTaskList={setTaskList}
        taskList={taskList} />
        <Tasks />
    </div>
  )
}
