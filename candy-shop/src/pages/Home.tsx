import '../assets/app.scss';
import { ApiError, TooManyRequestsError } from '../services/ApiError';
import Button from 'react-bootstrap/Button';
import type { Candy, TagSlug } from '../types/Types';
import { getCandies } from '../services/BortakvallApi';
import { Link, useSearchParams } from "react-router-dom";
import Loader from '../components/Loader';
import TagFilters from '../components/TagFilters';
import { useCart } from "../context/useCart";
import { useState, useEffect } from 'react';


const Home = () => {
  const [candies, setCandies] = useState<Candy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag") as TagSlug | null;
  
  const possiblyfilteredCandies = tagParam
  ? candies.filter(c => 
    c.tags?.some(tag => tag.slug === tagParam) ?? false
  )
  : candies;
  
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const loadCandies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCandies();
        const candiesInStock = data.filter(c => c.stock_status !== "outofstock");
        setCandies(candiesInStock);
      } catch (err) {
        if (err instanceof TooManyRequestsError) {
          setError("För många anrop just nu, försök om en stund.");
        } else if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Kunde inte ladda godisar. Prova att ladda om sidan.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCandies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <h2 className="main-centered" aria-live="assertive">{error}</h2>;
  if (candies.length === 0) return <h2 className="main-centered" aria-live="polite">Inga godisar i lager just nu 🍬</h2>;

  const candiesCards = possiblyfilteredCandies.map(c => {
    const itemInCart = cart.find(item => item.candy.id === c.id);
    const isMaxStockReached = itemInCart ? itemInCart.quantity >= c.stock_quantity : false;
    return (
      <article className='candy-box' key={c.id}>
        <h2>{c.name}</h2>
        <p>{c.price} SEK</p>
        <img alt={c.name} src={`https://www.bortakvall.se${c.images.thumbnail}`} />
        <Link 
          aria-label={`Visa detaljer för ${c.name}, pris: ${c.price} SEK`} 
          className="details-link"
          to={c.name.toLowerCase().replace(/\s+/g, "-")} 
          state={{ id: c.id, tagParam }}
        >
          Läs mer
        </Link>
        <Button 
          aria-disabled={isMaxStockReached}
          aria-label={ isMaxStockReached? "Slut i lager. Produkten kan inte läggas i varukorgen.": "Lägg till produkten i varukorgen"}
          disabled = {isMaxStockReached} 
          onClick={() => { console.log("Adding to cart:", c); addToCart(c); }}
          variant="dark"  
          >
            {isMaxStockReached ? "Slut i lager" : "Lägg till i varukorgen"}
        </Button>
      </article>
    )
  });

  const tagSlugs: TagSlug[] = ["gelatinfri", "palmoljefri", "vegansk", "nyhet"];
  return (
    <>
      <h1>Våra godisar är de bästa!</h1>
      <TagFilters availableTags={tagSlugs} />
      <section className="candies-container">
        {possiblyfilteredCandies.length > 0 ? candiesCards : (
          <p>Inga godisar hittades för vald filter.</p>
        )}
      </section>
    </>
  );
};

export default Home;
