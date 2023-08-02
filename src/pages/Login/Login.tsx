import React from 'react'
import '../Login/Login.scss'

const Login: React.FC = () => {
  return (
    <div className="container p-3" id="login">
      <form>
        <h3>To Do App</h3>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control" type="text" name="username" id="username"/>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" id="password"/>
        </div>
        <button className="btn btn-primary my-2" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login