import '../assets/app.scss'
import Button from 'react-bootstrap/Button'
import type {Candy} from '../services/Types'
import { getCandies } from '../services/BortakvallApi'
import {useState, useEffect} from 'react'

const Home = () => {
  const [candies, setCandies] = useState<Candy[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadCandies = async () => {
        setLoading(true)
        setError(null)

        try {
          const data = await getCandies() // API call
          setCandies(data)
        } catch (err) {
          if (err instanceof Error) {
            setError(err)
          } else {
            setError(new Error("An unknown error occurred"))
          }
        } finally {
          setLoading(false)
        }
    }

    loadCandies()
  }, [])

  if(loading){
    return <h1 aria-live="polite">Loading...</h1>
  }

  if(error){
    return <h1 aria-live="assertive">{error.message}</h1>
  }

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
