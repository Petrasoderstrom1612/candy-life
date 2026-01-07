import type { CandyLocationState, CandyWithDescription } from "../services/Types";
import { getOneCandy } from '../services/BortakvallApi';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

// ✅ Define a stricter Location type so state is known
interface CandyLocation {
  pathname: string;
  search: string;
  hash: string;
  state: CandyLocationState | null;
  key: string;
}

const CandyDetails = () => {
  // ✅ Use our typed location
  const location = useLocation() as CandyLocation;

  const id = location.state?.id ?? null;

  const [candy, setCandy] = useState<CandyWithDescription | null>(null);

  useEffect(() => {
    if (id === null) return;

    const loadCandy = async () => {
      try {
        const data = await getOneCandy(id);
        setCandy(data);
        console.log("name", data.name);
      } catch (error) {
        console.log(error);
      }
    };

    loadCandy();
  }, [id]);

  return (
    <section>
      <Link
        aria-label="Gå tillbaka till all godis"
        to=".."
        relative="path"
        className="back-button"
      >
        &larr; <span>Tillbaka till all godis</span>
      </Link>
      {candy?.name}
    </section>
  );
};

export default CandyDetails;
