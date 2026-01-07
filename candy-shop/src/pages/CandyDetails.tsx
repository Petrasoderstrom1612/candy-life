import {useParams, useLocation, Link} from "react-router-dom"

const CandyDetails = () => {
  const params = useParams()
  console.log("params", params) //id
  const location = useLocation() 
  console.log(location) 

  return (
    <section>
      <Link to=".." relative="path" className="back-button">&larr; <span>Tillbaka till all godis</span></Link>
    </section>
  )
}

export default CandyDetails
