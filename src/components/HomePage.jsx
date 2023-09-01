// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import "../styles/HomePage.css";
// import Welcome from "./Welcome.jsx";
// // import { faBars } from "@fortawesome/free-solid-svg-icons";

// const HomePage = () => {
//   const [popular, setPopular] = useState([]);
//   const [state, setState] = useState("bypopularity");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [navOpen, setNavOpen] = useState(false); 
//   const [searchResults, setSearchResults] = useState([]); // State to store search results


//   const searchAnime = async () => {
//     try {
//       setIsLoading(true); // Set loading state while making the request
//       const response = await axios.get(
//         `https://api.jikan.moe/v4/anime/${searchQuery}`
//       );
//       setSearchResults([response.data.data]); // Store the single search result in an array
//       setIsLoading(false); // Set loading state to false after receiving the response
//     } catch (error) {
//       console.error("Error searching anime:", error);
//       console.error("Error details:", error.response);
//       setIsLoading(false); // Set loading state to false in case of an error
//     }
//   };

//   const toggleNav = () => {
//     setNavOpen(!navOpen);
//   }

//   const titleMapping = {
//     bypopularity: "Popular",
//     airing: "Airing",
//     upcoming: "Upcoming" 
//   };

//   const changeState = (newState) => {
//     setState(newState);
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://api.jikan.moe/v4/top/anime?filter=${state}`);
//         setPopular(response.data.data);
//         console.log(response.data.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         console.error("Error details:", error.response);
//       }
//     };

//     fetchData();
//   }, [state]); 

//   return (
//     <div>

//       {/* Navbar */}
//       <div className={`navbar ${navOpen ? 'nav-open' : ''}`}>
//         <div className="nav-toggle" onClick={toggleNav}>
//           {/* <FontAwesomeIcon icon={faBars} /> */}
//           bars
//         </div>
//         <div className="nav-links">
//           <button className="nav-button" onClick={() => changeState("bypopularity")}>Popular</button>
//           <button className="nav-button" onClick={() => changeState("airing")}>Airing</button>
//           <button className="nav-button" onClick={() => changeState("upcoming")}>Upcoming</button>
//         </div>
//         <h1>{titleMapping[state]} anime</h1>
//         <div className="search">
//           <input
//             type="search"
//             name=""
//             id=""
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search..."
//           />
//             <button className="search-button" onClick={searchAnime}>
//               Search
//           </button>
//         </div>
//       </div>
//       {isLoading ? (
//         <Welcome />
//       ) : (
//         <div className="container">
//           {searchResults.map((item) => (
//             <Link to={`/anime/${item.mal_id}`} key={item.mal_id}>
//               <div className="popular_card">
//                 <div className="image">
//                   <img src={item.images.jpg.image_url} alt="" />
//                 </div>
//                 <div className="overlay">
//                   <p className="title">{item.title}</p>
//                   <button className="watch-button">Watch now</button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//       {/* Dynamic title */}

//       {isLoading ? <Welcome /> : (
//         <div className="container">
//           {popular &&
//             popular.map((item) => ( 
//               <Link to={`/anime/${item.mal_id}`} key={item.mal_id}>
//                 <div className="popular_card">
//                   <div className="image">
//                     <img src={item.images.jpg.image_url} alt="" />
//                   </div>
//                   <div className="overlay">
//                     <p className="title">{item.title}</p>
//                     <button className="watch-button">Watch now</button>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomePage;


import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import Welcome from "./Welcome.jsx";

const HomePage = () => {
  const [popular, setPopular] = useState([]);
  const [state, setState] = useState("bypopularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", error.response);
      }
    };

    fetchData();
  }, [state]);

  // Use useEffect to fetch data when searchQuery changes
  useEffect(() => {
    const searchAnime = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]); // Clear search results if searchQuery is empty
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/q=${searchQuery}`
        );
        setSearchResults([response.data.data]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error searching anime:", error);
        console.error("Error details:", error.response);
        setIsLoading(false);
      }
    };

    searchAnime(); // Call the searchAnime function when searchQuery changes
  }, [searchQuery]);

  return (
    <div>
      <div className={`navbar ${navOpen ? 'nav-open' : ''}`}>
        <div className="nav-toggle" onClick={toggleNav}>
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
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
            placeholder="Search..."
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Displaying search results */}
      {isLoading ? (
        <Welcome />
      ) : (
        <div className="container">
          {searchResults.map((item) => (
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
      
      {/* Dynamic title */}
      {!isLoading && (
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
