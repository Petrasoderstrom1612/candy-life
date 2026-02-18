import { ApiError, TooManyRequestsError } from '../services/ApiError';
import type { CandyLocation, CandyWithDescription} from "../types/Types";
import { formatHTML } from "../utils/formatHTML";
import { formatTags } from "../utils/formatTags";
import { getOneCandy } from '../services/BortakvallApi';
import { Link, useLocation} from "react-router-dom";
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';

const CandyDetails = () => {
  const [candy, setCandy] = useState<CandyWithDescription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const location = useLocation() as CandyLocation;
  const id = location.state?.id ?? null;
  const queryString = location.state?.queryString || "";
  const tag =  location.state?.tagParam ?? "";

  useEffect(() => {
    if (id === null) return;
    
    const loadCandy = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getOneCandy(id);
        setCandy(data);
        console.log("name", data.name);
      } catch (err) {
        if (err instanceof TooManyRequestsError) {
          setError("För många anrop just nu, försök om en stund.");
        } else if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Kunde inte ladda godisar. Prova att ladda om sidan.");
        }
      } finally {
        setLoading(false)
      } 
    };

    loadCandy();
  }, [id]);

  if(loading) { return <Loader />;}
  if(error){ return <h2 className="main-centered" aria-live="assertive">{error}</h2> }

  return (
    <section className="one-candy-section">
      <Link
        aria-label={`Gå tillbaka till ${tag} godis`}
        to = {queryString ? `..?${queryString}` : ".."}
        relative="path"
        className="back-button"
      >
        &larr; <span>Tillbaka till {tag ? tag : "all"} godis</span>
      </Link>
        <article className="one-candy-detail-article">
            <div className="one-candy-detail-article-h-img">
              <div className="one-candy-detail-article-h">
                <h2 className="one-candy-h2">{candy?.name}</h2>
                <h3 className="one-candy-h3">${candy?.price} SEK</h3>
              </div>
              {candy?.images?.large && (
                <img
                  className="one-candy-img"
                  src={`https://www.bortakvall.se${candy.images.large}`}
                  alt={candy.name}
                />
              )}
            </div>
            <div className="one-candy-article-p">
              <p>{formatHTML(candy?.description)}</p>
              {candy?.tags?.length ? (<p>{formatTags(candy.tags)}</p>) : null}
              {candy?.tags?.length ? candy.tags.map((t) => (
            <Link
              aria-label={`Se alla ${t.name} godis`}
              className="candy-type candy-type-detail"
              key={t.id}
              to={`..?tag=${t.slug}`}
              relative="path"
            >
              {t.name} godis
            </Link>
              ))
            : null}
            </div>
        </article>
    </section>
  );
};

export default CandyDetails;
