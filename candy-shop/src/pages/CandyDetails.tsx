import type { CandyLocationState, CandyWithDescription } from "../services/Types";
import { getOneCandy } from '../services/BortakvallApi'
import { Link, useLocation} from "react-router-dom";
import {useEffect, useState} from 'react';

  const CandyDetails = () => {
    const location = useLocation();
    const state = location.state as CandyLocationState | null;
    const id = state?.id ?? null;

    const [candy, setCandy] = useState<CandyWithDescription | null>(null);
 

    useEffect(() => {
      // Guard: do nothing if no id
      if (!id) return;

      const loadCandy = async () => {


        try {
          const data = await getOneCandy(id);
          setCandy(data);
          console.log("name", data.name)
        } catch{
          console.log("fel")
        }
      };

      loadCandy();
    }, [id]); // ✅ Only one useEffect, depends on id



    return (
      <section>
        <Link 
          aria-label={`Gå tillbaka till all godis`} 
          to=".." 
          relative="path" 
          className="back-button"
        >&larr; <span>Tillbaka till all godis</span></Link>
        {candy?.name}
      </section>
    )
  }


export default CandyDetails
