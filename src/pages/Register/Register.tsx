import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import http from '../../config/axios'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = React.useState({
    id: Math.floor(Math.random() * 100),
    username: '',
    password: ''
  })

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setRegisterUser({
      ...registerUser,
      [name] : value
    })
  }

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      id: registerUser.id,
      username: registerUser.username,
      password: registerUser.password
    }

    if(!userData.username && !userData.password){
      alert('Please fill in all fields')
    } else {
      try {
        await http.post('/users', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert('Registration Successful!')
        navigate('/')
      } catch (err) {
        console.log(`Error registering user ${JSON.stringify(err)}`)
      }
    }
  }

  return (
    <div className="container p-3" id="login">
      <form onSubmit={handleRegisterSubmit}>
        <h3>To Do App</h3>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control" type="text" name="username" id="username" onChange={handleRegisterChange}/>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" id="password" onChange={handleRegisterChange}/>
        </div>
        <button className="btn btn-primary my-2" type="submit">Register</button>
        <Link to="/" className="mx-2">Login</Link>
      </form>
    </div>
  )
}

export default Register