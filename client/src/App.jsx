import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import Signup from './Pages/Signup.jsx'
import About from './Pages/About'
import Login from './Pages/Login.jsx'
import EmailVerification from './Pages/EmailVerification.jsx'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/> 
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/emailverify' element={<EmailVerification/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
