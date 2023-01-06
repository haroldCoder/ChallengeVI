import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import Post from './components/Post'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Banner/>}/>
          <Route path='/post' element={<Post/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
