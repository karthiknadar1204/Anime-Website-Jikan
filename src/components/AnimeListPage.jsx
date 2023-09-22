import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import { FaBars, FaTimes } from "react-icons/fa";
import navIc from "./nav-white-img-bg.png";

const AnimeListPage = ({ state, category }) => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false); // Initialize menu state

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";

        // Configure API URL based on category
        if (category === "Popular") {
          apiUrl = "https://api.jikan.moe/v4/top/anime?filter=bypopularity";
        } else if (category === "Airing") {
          apiUrl = "https://api.jikan.moe/v4/top/anime?filter=airing";
        } else if (category === "Upcoming") {
          apiUrl = "https://api.jikan.moe/v4/top/anime?filter=upcoming";
        }

        const response = await axios.get(apiUrl);
        setPopular(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", error.response);
      }
    };

    fetchData();
  }, [category]);

  const toggleMenu = () => {
    setOpen(!open); // Toggle the menu state
  };

  return (
    <div className="anime-list-page">
      <div className="nav">
        <Link to="/" className="logo-anime">
          AniWatch
        </Link>
        <button className="menu-button">
          {open ? <FaTimes /> : <FaBars />}
        </button>
        <button className="menu-btnn" onClick={toggleMenu}>
          <img src={navIc} alt="menu-picture" className="nav-menu" />
        </button>
        <div className={`category-links  ${open ? "phone-onn" : ""}`}>
          <Link to="/popular" className="nav-link">
            Popular
          </Link>
          <Link to="/airing" className="nav-link">
            Airing
          </Link>
          <Link to="/upcoming" className="nav-link">
            Upcoming
          </Link>
        </div>
      </div>
      <div className="category">{category}</div>

      {/* Display anime list */}
      {!isLoading && (
        <div className="container">
          {popular.map((item) => (
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
};

export default AnimeListPage;
