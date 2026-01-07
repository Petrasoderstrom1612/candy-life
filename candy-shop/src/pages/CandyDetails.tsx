import {useLocation, Link} from "react-router-dom"

const CandyDetails = () => {
  const location = useLocation() 
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
