// React & Typescript, Ejemplo Práctico sencillo
// https://www.youtube.com/watch?v=IbJFERe9F9w&ab_channel=FaztCode

import React, { useRef, useState } from 'react'

type FormElement = React.FormEvent<HTMLFormElement>

interface ITask {
  text: string
  done: boolean
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
    inputRef?.current?.focus()
  }

  const addTask = (text: string): void => {
    const newTasks: ITask[] = [...tasks, { text, done: false }]
    setTasks(newTasks)
  }

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
  }

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  className='form-control'
                  autoFocus
                  ref={inputRef}
                />
                <button className='btn btn-success btn-block mt-2'>Save</button>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask, index: number) => (
            <div className='card card-body mt-2' key={index}>
              <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>{task.text}</h2>
              <div>
                <button className="btn btn-secondary" onClick={() => toggleDoneTask(index)}>
                  {task.done ? '⛔' : '✅'}
                </button>
                <button className="btn btn-danger" onClick={() => removeTask(index)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
