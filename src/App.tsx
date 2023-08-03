import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  const [user, setUser] = React.useState({
    username:'',
    password: ''
  })

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      const userData = JSON.parse(storedUser);
      setUser({
        username: userData.username,
        password: userData.password
      })
    } else {
      setUser({
        username: '',
        password: ''
      })
    }
  },[])

  console.log(user)

  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to='/'/>}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};

export default App;
