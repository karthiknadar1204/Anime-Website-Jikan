import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AnimeListPage from "./components/AnimeListPage";
import Anime from "./components/Anime";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/popular" element={<AnimeListPage state="bypopularity" category="Popular" />} />
        <Route path="/airing" element={<AnimeListPage state="airing" category="Airing" />} />
        <Route path="/upcoming" element={<AnimeListPage state="upcoming" category="Upcoming" />} />
        <Route path="/anime/:id" element={<Anime />} />
      </Routes>
    </Router>
  );
};

export default App;
