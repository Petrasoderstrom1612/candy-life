import type { CandyLocationState } from "../services/Types";
import { Link, useLocation} from "react-router-dom"

const CandyDetails = () => {
  const location = useLocation() as { state: CandyLocationState | null }; 
  console.log(location?.state?.id)

  return (
    <section>
      <Link 
        aria-label={`Gå tillbaka till all godis`} 
        to=".." 
        relative="path" 
        className="back-button"
      >&larr; <span>Tillbaka till all godis</span></Link>
    </section>
  )
}

export default CandyDetails
