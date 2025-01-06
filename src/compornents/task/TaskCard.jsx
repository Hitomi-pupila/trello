import React from 'react'
import { TaskCardTitle } from './TaskCardTitle'
import { TaskCardDeleteButton } from './button/TaskCardDeleteButton'
import { TaskCardInput} from './input/TaskCardInput'
import { Tasks } from './Tasks'

export const TaskCard = () => {
  return (
    <div className='taskCard'>
        <TaskCardTitle />
        <TaskCardDeleteButton />
        <TaskCardInput />
        <Tasks />
    </div>
  )
}
