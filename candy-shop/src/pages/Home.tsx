import '../assets/app.scss'
import Button from 'react-bootstrap/Button'
import type {Candy} from '../services/Types'
import { getCandies } from '../services/BortakvallApi'
import {useState, useEffect} from 'react'

const Home = () => {
  const [candies, setCandies] = useState<Candy[]>([])

  useEffect(() => {
    getCandies().then(setCandies)
  }, [])

  return (
    <>
      <h1>Våra godisar är de bästa!</h1>
      <div className="candies-container">
        {candies.length > 0 && candies.map(c => <div className='candy-box' key={c.id}>
          <h2>{c.name}</h2>
          <p>{c.price} SEK</p>
          <img alt={c.name} src={`https://www.bortakvall.se${c.images.thumbnail}`} />
          <Button variant="dark">Lägg till i varukorgen</Button>
        </div>
        )}
      </div>
    </>
  )
}

export default Home
