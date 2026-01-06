import {useState, useEffect} from 'react'
import '../assets/app.scss'
import type {Candy} from '../services/Types'
import { getCandies } from '../services/BortakvallApi'

const Home = () => {
  const [candies, setCandies] = useState<Candy[]>([])

  useEffect(() => {
    getCandies().then(setCandies)
  }, [])

  return (
    <div>
      <h1>Candies</h1>
      {candies.length > 0 && candies.map(c => 
        <div key={c.id}>
          <h2>{c.name}</h2>
          <p>{c.price} SEK</p>
          <img alt={c.name} src={`https://www.bortakvall.se${c.images.thumbnail}`}/>      
        </div>
      )}
    </div>
  )
}

export default Home
