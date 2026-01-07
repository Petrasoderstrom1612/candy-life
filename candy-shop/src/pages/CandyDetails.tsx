import {Link} from "react-router-dom"

const CandyDetails = () => {
  return (
    <section>
      <Link to=".." relative="path" className="back-button">&larr; <span>Tillbaka till all godis</span></Link>
    </section>
  )
}

export default CandyDetails
