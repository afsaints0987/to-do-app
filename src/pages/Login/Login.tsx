import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../Login/Login.scss'
import http from '../../config/axios'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username: user.username,
      password: user.password
    }

    console.log(userData)

    if(!userData.username || !userData.password){
      alert("Please fill up the form");
    } else {
      const response = await http.get('/users');
      const users = response.data
      users.map((user: { username: string }) => {
        if(userData.username === user.username){
          alert('Login Successful')
          localStorage.setItem('user', JSON.stringify(userData))
          navigate('/dashboard')
        }
      })
    }
  }

  return (
    <div className="container p-3" id="login">
      <form onSubmit={handleLoginSubmit}>
        <h3>To Do App</h3>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control" type="text" name="username" id="username" onChange={handleLoginChange}/>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" id="password" onChange={handleLoginChange}/>
        </div>
        <button className="btn btn-primary my-2" type="submit">Log-in</button>
        <Link to="/register" className="mx-2">Register</Link>
      </form>
    </div>
  )
}

export default Login