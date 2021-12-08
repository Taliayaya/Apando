import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/hooks'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { state } = useLocation()

    const handleLogin = () => {
        login().then(() => {
            navigate(state?.path || '/dashboard')
        })
    }
    return (
        <div>
            <h1>Login (Public)</h1>
            <button onClick={handleLogin}>Log in</button>
        </div>
    )
}

export default Login
