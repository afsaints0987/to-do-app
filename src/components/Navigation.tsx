import React from 'react'
import {useNavigate} from 'react-router-dom'

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/')
    }

  return (
    <header className="bg-primary">
        <nav className="navbar expand-lg px-4 py-2 text-light">
            <h3>Todo App</h3>
            <button className="btn btn-transparent text-light" onClick={handleLogout}>Logout</button>
        </nav>
    </header>
  )
}

export default Navigation