import { useState } from 'react'
import Header from './components/header/header'
import Card from './components/card/card'
import './App.css'
import {Home} from "./components/pages/Home.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
        <Home />
    </>
  )
}

export default App
