import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { 
  Navbar, 
  Logo, 
  NavigationLinks, 
  NavLink, 
  ButtonsContainer
} from '../styles/styles'; // Ensure correct path
import bvgate from "../assets/bvgate.jpg"; 
import department from "../assets/department.webp"; 
import soa from "../assets/soa.jpg"; 
import auto1 from "../assets/auto1.jpg"; 
import cms from "../assets/cms.jpg";
import apaji from "../assets/apaji.jpg";

const images = [bvgate, department, auto1, cms, soa, apaji];

const Home = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setIsAnimating(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  const handleTeamRegisterClick = () => {
    navigate('/teams/register');
  };

  return (
    <>
      <Navbar>
        <Logo src="/logo1.png" alt="Logo" />
        
        {/* Mentor-Mentee System Title inside Navbar */}
        <MentorMenteeTitle>Mentor-Mentee System</MentorMenteeTitle>

        <NavigationLinks>
          <NavLink to="/AboutUs">About Us</NavLink>
          <NavLink to="http://www.banasthali.org/banasthali/wcms/en/home/" target="_blank">Banasthali</NavLink>
          <NavLink to="/Coordinator">Message</NavLink>
          <NavLink to="/teacher-details">Mentors</NavLink>
        </NavigationLinks>
        
        <ButtonsContainer>
          <Button onClick={handleTeamRegisterClick}>Team Register</Button>
          <Button onClick={handleLoginClick}>Sign In</Button>
        </ButtonsContainer>
      </Navbar>

      <HeroSection>
        <ImageSlider 
          key={currentImage}
          style={{ backgroundImage: `url(${images[currentImage]})` }} 
          $isAnimating={isAnimating}
        />
      </HeroSection>

      {/* Footer Section */}
      <Footer>
        <FooterContent>
          <p>Email: <a href="mailto:deanadmin@banasthali.ac.in">deanadmin@banasthali.ac.in</a></p>
          <p> | Contact: <a href="tel:+911438228456">01438-228456</a></p>
        </FooterContent>
        <p>© 2025 Banasthali Vidyapith. All rights reserved.</p>
      </Footer>
    </> 
  );
};

export default Home;

// 🔥 Styles
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomOutEffect = keyframes`
  from { transform: scale(1.3); }
  to { transform: scale(0.998); }
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 88.1vh; /* Reduced from 100vh */
  overflow: hidden;
`;

const ImageSlider = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      animation: ${zoomOutEffect} 1.5s ease-in-out;
    `}
`;

// 💡 New Mentor-Mentee Title Style inside Navbar
const MentorMenteeTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: rgb(24, 60, 95);
  text-shadow: 0px 0px 10px white;
  margin: 0 20px;
  font-family: 'Poppins', sans-serif;
  flex-shrink: 0;
`;

// 💡 Button Styles (Updated to `rgb(29, 70, 111)`)
const Button = styled.button`
  background-color: rgb(29, 70, 111);
  color: white;
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgb(24, 60, 95);
    box-shadow: 0px 0px 10px rgba(29, 70, 111, 0.8);
  }
`;

// 💡 Footer Styles (Updated Height & Layout)
const Footer = styled.footer`
  background: rgb(29, 70, 111);
  color: white;
  text-align: center;
  padding: 5px 0; /* Reduced height */
  font-size: 14px;
  border-top: 3px solid #f1c40f;
`;

const FooterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px; /* Adds space between email and contact */

  a {
    color: #f1c40f;
    text-decoration: none;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
    display: inline-block; /* Keeps email and contact on the same line */
  }
`;
