import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import Signup from './Pages/Signup.jsx'

import About from './Pages/About'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/> 
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App
