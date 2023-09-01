import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Anime from "./components/Anime";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id"  element={<Anime/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
