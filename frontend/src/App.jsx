import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'sonner'
import CaseCreatePage from './pages/CaseCreatePage'
import CaseDetailPage from './pages/CaseDetailPage'
import CaseListPage from './pages/CaseListPage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<DashboardPage/>}/>
      <Route path='/cases/new' element={<CaseCreatePage/>}/>
      <Route path='/cases' element={<CaseListPage/>}/>
      <Route path='/cases/:id' element={<CaseDetailPage/>}/>
    </Routes>
    <Toaster position='top-right' closeButton={true}/>
    </BrowserRouter>
  )
}

export default App