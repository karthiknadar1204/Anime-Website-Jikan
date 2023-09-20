import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import img from "../assets/roronoa-zoro.png";
import VanillaTilt from "vanilla-tilt";

const HomePage = () => {
  const leftImageRef = useRef(null);

  useEffect(() => {
    const element = leftImageRef.current;
 
    if (element) {
      VanillaTilt.init(element);
      element.addEventListener("tiltChange", callback);
    }

    return () => {
      if (element) {
        element.vanillaTilt.destroy();
      }
    };
  }, []);

  const callback = (event) => {
    console.log("Tilt changed:", event);
  };

  return (
    <div className="homepage">
      <div className="navbar">
        <Link to="/" className="logo">
          AniWatch
        </Link>
      </div>

      <div className="hero-texts">
        <span className="hero-title">
          Watch your<br />
          favorite<br />
          anime here
        </span>
      </div>

      <div className="hero-section">
        <div className="hero-links">
          <Link to="/popular" className="hero-button">
            Popular
          </Link>
          <Link to="/airing" className="hero-button">
            Airing
          </Link>
          <Link to="/upcoming" className="hero-button">
            Upcoming
          </Link>
        </div>
        <div className="left-image">
          <img src={img} alt="" ref={leftImageRef} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
