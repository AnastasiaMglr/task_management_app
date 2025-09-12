import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [showForm, setShowForm] = useState(false)

  const fetchTasks = async () => {
    try {
      console.log('getTasks start')
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setTasks(res.data)
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      console.error('Get Tasks error:', errorMessage) // log in console
      alert(errorMessage) // show in alert
    }
  }

    useEffect(() => {
    fetchTasks()
  }, [])

  const toggleTask = async (taskId, currentState) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        { completed: !currentState },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      fetchTasks() // reload tasks
    } catch (err) {
      console.error("Update Task error:", err.response?.data?.message || err.message)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`,
        { title: newTask }, // <-- adapté à ton backend (ajuste si le champ est différent)
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setNewTask("")
      setShowForm(false)
      fetchTasks()
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      console.error('Add Task error:', errorMessage)
      alert(errorMessage)
    }
  }

    const handleDelTask = async (taskId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      fetchTasks()
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      console.error('Delete Task error:', errorMessage)
      alert(errorMessage)
    }
  }

  return (
    <div>
      <h1>List Tasks</h1>

    {tasks.map(task => (
      <div key={task._id} className={`task-card`}>
        <h3>{task.title}</h3>
          <button onClick={() => toggleTask(task._id, task.completed)}>
            {task.completed ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
          </button>
          <button onClick={() => handleDelTask(task._id)}>Remove</button>
      </div>
    ))}

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add task"}
      </button>

      {showForm && (
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task Name"
            required
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </div>
  )
}

export default Dashboard