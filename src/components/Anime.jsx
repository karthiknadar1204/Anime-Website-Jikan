import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Anime.css"
import { FaPlay } from 'react-icons/fa';

const Anime = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [reviews,setReviews]=useState([]);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnimeDetails(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", error.response);
      }
    };

    const fetchAnimeCharacters = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
        setCharacters(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", error.response);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/reviews`);
        console.log(response.data);
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };
    fetchAnimeDetails();
    fetchAnimeCharacters();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    let slideIndex = 0; 
    let interval;
    const carousel = document.querySelector('.carousel');
  
    const showSlides = () => {
      const slides = document.querySelectorAll('.character-item');
  
      if (slides.length === 0 || !carousel) return;
  
      slides.forEach(slide => {
        slide.style.display = 'inline-block';
      });
  
      slideIndex++;
  
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
  
      const slideWidth = slides[0].clientWidth + 10; 
  
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(-${(slideIndex - 1) * slideWidth}px)`;
  
      clearInterval(interval);
      interval = setTimeout(() => {
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-${(slideIndex - 1) * slideWidth}px)`;
  
        setTimeout(() => {
          carousel.style.transition = 'transform 0.5s ease-in-out';
          showSlides();
        }, 100);
      }, 3000); 
    };
  
    showSlides();
  
    return () => {
      clearInterval(interval);
    };
  }, [characters]);
  
  
  

  if (!animeDetails) {
    return <div>Loading...</div>;
  }

  const navigateHome = () => {
    navigate("/");
  };

  const toggleReviewExpansion = (index) => {
    if (expandedReviewIndex === index) {
      setExpandedReviewIndex(null);
    } else {
      setExpandedReviewIndex(index);
    }
  };

  return (
    <div className="Anime-page" >
        <button className="back-button" onClick={navigateHome}>Back</button>
        <span className="anime-title" >{animeDetails.title}</span>
        <div className="basicInfo">

        <div className="section-container">
  <div className="upperSection">
    <div className="left">
      <div className="image">
        <img src={animeDetails.images.jpg.large_image_url} alt="" />
      </div>
    </div>
    <div className="right">
      <div className="score">
        <span className="label">Rating: {animeDetails.score}</span>
      </div>
      <div className="rank">Rank: {animeDetails.rank}</div>
      <div className="episodes">Episodes: {animeDetails.episodes}</div>
      <div className="season">Seasons: {animeDetails.season}</div>
      <div className="status">Status: {animeDetails.status}</div>
      <h5>Genres</h5>
      <div className="genres">
        {animeDetails.genres &&
          animeDetails.genres.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
      </div>
      <div className="source">
        <span>Source: {animeDetails.source}</span>
      </div>
      <div className="background">
        <h5>Background</h5>
        {animeDetails.background}
      </div>
<div className="trailer-btn" onClick={openModal}>
  <span>
    <FaPlay className="play-icon" />
  </span>
</div>


      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="trailer-container">
              <iframe
                title="Anime Trailer"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${animeDetails.trailer.youtube_id}?autoplay=1`}
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

          <br /><br /><br /><br />

          <div className="midSection">
            <div className="synopsis">
              <h5>Synopsis</h5>
              {animeDetails.synopsis}
            </div>
          </div>

          <br /><br /><br /><br /><br />
          <div className="lowerSection">
            <div className="characters">
              <hr />
              <h3>Characters</h3>
              <div className="carousel-container">
                <div className="carousel">
                  {characters && characters.map((item, index) => (
                    <div className="character-item" key={index}>
                      <div className="character-image">
                        <img
                          src={item.character.images.jpg.image_url}
                          alt={`Character ${index + 1}`}
                        />
                      </div>
                      <div className="character-name">{item.character.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-container-review">
  <div className="bottomReviews">
    {reviews &&
      reviews.slice(0, 5).map((item, index) => (
        <div className="reviews" key={index}>
          <div className="review">
            <p>
              {expandedReviewIndex === index
                ? item.review
                : item.review.slice(0, 250) + "..."}
            </p>
            {item.review.length > 250 && (
              <button onClick={() => toggleReviewExpansion(index)}>
                {expandedReviewIndex === index ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      ))}
  </div>
</div>


        </div>
    </div>
  );
};

export default Anime;
