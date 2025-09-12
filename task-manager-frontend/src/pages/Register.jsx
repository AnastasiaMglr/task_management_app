import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      console.log('Register start')
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { email, password })
      console.log(res.data)
      alert('Compte créé ! Connecte-toi maintenant.')
      navigate('/login')
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      console.error('Register error:', errorMessage) // log in console
      alert(errorMessage) // show in alert
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  )
}

export default Register
