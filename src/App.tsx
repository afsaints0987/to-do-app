import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </>
  )
}

export default App
