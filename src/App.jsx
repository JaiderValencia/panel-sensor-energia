import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Context } from './context/Auth/Context'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import PrivateRoute from './components/protectedRoutes/PrivateRoute'
import PublicRoute from './components/protectedRoutes/PublicRoute'

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<h1>home Page</h1>} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context>
  )
}

export default App
