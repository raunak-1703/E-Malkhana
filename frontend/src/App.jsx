import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<DashboardPage/>}/>
    </Routes>
    <Toaster position='top-right' closeButton={true}/>
    </BrowserRouter>
  )
}

export default App