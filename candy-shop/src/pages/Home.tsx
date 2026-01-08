import '../assets/app.scss';
import Button from 'react-bootstrap/Button';
import type { Candy } from '../services/Types';
import { getCandies } from '../services/BortakvallApi';
import { Link, useSearchParams } from "react-router-dom";
import Loader from '../components/Loader';
import TagFilters from '../components/TagFilters';
import type {TagSlug} from '../services/Types';
import { useState, useEffect } from 'react';

const Home = () => {
  const [candies, setCandies] = useState<Candy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag") as TagSlug | null;

  const possiblyfilteredCandies = tagParam
    ? candies.filter(c => 
        c.tags?.some(tag => tag.slug === tagParam) ?? false
      )
    : candies;

  useEffect(() => {
    const loadCandies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCandies();
        setCandies(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    loadCandies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <h2 className="main-centered" aria-live="assertive">{error.message}</h2>;
  if (candies.length === 0) return <h2 className="main-centered" aria-live="polite">Inga godisar i lager just nu 🍬</h2>;

  const candiesCards = possiblyfilteredCandies.map(c => (
    <div className='candy-box' key={c.id}>
      <h2>{c.name}</h2>
      <p>{c.price} SEK</p>
      <img alt={c.name} src={`https://www.bortakvall.se${c.images.thumbnail}`} />
      <Link 
        aria-label={`Visa detaljer för ${c.name}, pris: ${c.price} SEK`} 
        className="details-link"
        to={c.name.toLowerCase().replace(/\s+/g, "-")} 
        state={{ id: c.id }}
      >
        Läs mer
      </Link>
      <Button variant="dark">Lägg till i varukorgen</Button>
    </div>
  ));

  // Available tag slugs for TagFilters
  const tagSlugs: TagSlug[] = ["gelatinfri", "palmoljefri", "vegansk", "nyhet"];

  return (
    <>
      <h1>Våra godisar är de bästa!</h1>

      {/* Tag filters */}
      <TagFilters availableTags={tagSlugs} />

      <div className="candies-container">
        {filteredCandies.length > 0 ? candiesCards : (
          <p>Inga godisar hittades för vald filter.</p>
        )}
      </div>
    </>
  );
};

export default Home;
