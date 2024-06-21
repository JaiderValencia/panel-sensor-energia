import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register'
import {Context } from './context/Auth/Context'

function App() {

  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>home Page</h1>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<h1>Login page</h1>} />
        </Routes>
      </BrowserRouter>
    </Context>
  )
}

export default App
