import "../styles/Footer.css";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/karthiknadar1204" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://twitter.com/Karthikreincar1" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/karthik-nadar-b2155a25b/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/karthiknadar1204/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
        <p className="creator">Created by Karthik Nadar</p>
      </div>
    </footer>
  );
};

export default Footer;
