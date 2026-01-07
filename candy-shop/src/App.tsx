import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandyDetails from "./pages/CandyDetails";
import Home from "./pages/Home";
import Layout from "./components/Layout"
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/:id" element={<CandyDetails/>}/>
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
