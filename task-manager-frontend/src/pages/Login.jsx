import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      console.log('login start')
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password })
      console.log(res.data)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard') // redirige vers la page Dashboard
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      console.error('Login error:', errorMessage) // log in console
      alert(errorMessage) // show in alert
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login
