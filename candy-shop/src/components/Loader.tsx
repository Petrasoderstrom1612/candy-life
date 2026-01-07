import { BounceLoader } from 'react-spinners';

const Loader = () => {
    return (
    <div className="main-centered">
      <h2 aria-live="polite" className="mb-3">Loading...</h2>
      <BounceLoader color="#36d7b7"/>
    </div>)
}

export default Loader
