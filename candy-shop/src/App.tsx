import {useState, useEffect} from 'react'
import './assets/App.css'
import type {Candy} from './services/Types'
import { getCandies } from './services/BortakvallApi'

function App() {
  const [candies, setCandies] = useState<Candy[]>([])

  useEffect(() => {
    getCandies().then(setCandies)
  }, [])

  return (
    <div>
      <h1>Candies</h1>
      {candies.map(c => <div key={c.id}>{c.name}</div>)}
    </div>
  )
}

export default App
