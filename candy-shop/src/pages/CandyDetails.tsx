import type { CandyLocation, CandyWithDescription} from "../services/Types";
import { formatHTML } from "../utils/formatHTML";
import { formatTags } from "../utils/formatTags";
import { getOneCandy } from '../services/BortakvallApi';
import { Link, useLocation, useParams} from "react-router-dom";
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';

const CandyDetails = () => {
  const [candy, setCandy] = useState<CandyWithDescription | null>(null);
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const location = useLocation() as CandyLocation;
  const id = location.state?.id ?? null;

  const tag =  location.state?.tagParam ?? "";
  console.log(tag)

  // const queryString = location.state?.queryString || ""
   const params = useParams()
  console.log("params",params) 

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
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error("An unknown error occurred"))
        }
      } finally {
          setLoading(false)
        } 
    };

    loadCandy();
  }, [id]);

  if(loading) { return <Loader />;}
  if(error){ return <h2 className="main-centered" aria-live="assertive">{error.message}</h2> }

  return (
    <section className="one-candy-section">
      <Link
        aria-label={`Gå tillbaka till ${tag} godis`}
        to = {tag ? `..?tag=${tag}` : ".."}
        relative="path"
        className="back-button"
      >
        &larr; <span>Tillbaka till {tag ? tag : "all"} godis</span>
      </Link>
        <div className="one-candy-detail-div">
            <div className="one-candy-detail-div-h-img">
              <div className="one-candy-detail-div-h">
                <h2 className="one-candy-h2">{candy?.name}</h2>
                <h3 className="one-candy-h3">${candy?.price} SEK</h3>
              </div>
              <img className="one-candy-img" src={`https://www.bortakvall.se${candy?.images?.large}`} alt={`${candy?.name}`}/>
            </div>
            <div className="one-candy-div-p">
              <p>{formatHTML(candy?.description)}</p>
              {candy?.tags?.length ? (<p>{formatTags(candy.tags)}</p>) : null}
            </div>
        </div>
    </section>
  );
};

export default CandyDetails;
