import { useState } from 'react'
import Header from './components/header/header'
import Card from './components/card/card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Card />
    </>
  )
}

export default App
