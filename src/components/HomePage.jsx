import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import Welcome from "./Welcome.jsx";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [popular, setPopular] = useState([]);
  const [state, setState] = useState("bypopularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false); 



  const toggleNav = () => {
    setNavOpen(!navOpen);
  }


  const titleMapping = {
    bypopularity: "Popular",
    airing: "Airing",
    upcoming: "Upcoming" 
  };

  const changeState = (newState) => {
    setState(newState);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/top/anime?filter=${state}`);
        setPopular(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", error.response);
      }
    };

    fetchData();
  }, [state]); 

  return (
    <div>

      {/* Navbar */}
      <div className={`navbar ${navOpen ? 'nav-open' : ''}`}>
        <div className="nav-toggle" onClick={toggleNav}>
          {/* <FontAwesomeIcon icon={faBars} /> */}
          bars
        </div>
        <div className="nav-links">
          <button className="nav-button" onClick={() => changeState("bypopularity")}>Popular</button>
          <button className="nav-button" onClick={() => changeState("airing")}>Airing</button>
          <button className="nav-button" onClick={() => changeState("upcoming")}>Upcoming</button>
        </div>
        <h1>{titleMapping[state]} anime</h1>
        <div className="search">
          <input
            type="search"
            name=""
            id=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button className="search-button">Search</button>
        </div>
      </div>
      {/* Dynamic title */}

      {isLoading ? <Welcome /> : (
        <div className="container">
          {popular &&
            popular.map((item) => ( 
              <Link to={`/anime/${item.mal_id}`} key={item.mal_id}>
                <div className="popular_card">
                  <div className="image">
                    <img src={item.images.jpg.image_url} alt="" />
                  </div>
                  <div className="overlay">
                    <p className="title">{item.title}</p>
                    <button className="watch-button">Watch now</button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;