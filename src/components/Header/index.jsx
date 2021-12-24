import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/hooks'

function Header() {
    const { authed, logout } = useAuth()
    const navigate = useNavigate()
    console.log(authed)
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signin">SignIn</Link>
                </li>
            </ul>
            {authed && <button onClick={() => handleLogout}>Logout</button>}
        </nav>
    )
}

export default Header
