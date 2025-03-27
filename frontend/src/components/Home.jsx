
// // Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink }
  from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
// import logo1 from "../assets/logo1.png";
import { Link, useNavigate } from 'react-router-dom';

const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <Logo src="/logo1.png" alt="Logo" />
        <NavigationLinks>
          <NavLink as={Link} to="/AboutUs">About Us</NavLink>
          <NavLink as={Link} to="http://www.banasthali.org/banasthali/wcms/en/home/">Banasthali</NavLink>
          <NavLink as={Link} to="/Coordinator">Message</NavLink>
          {/* <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Banasthali</NavLink>
          <NavLink href="#">Coordinator's Message</NavLink> */}
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
          <GuestButton onClick={handleLoginClick}>Guest Mode</GuestButton>
        </ButtonsContainer>
      </Navbar>
      <HomeContainer>
        <SchoolInfo>
          <Title>Mentor-Mentee System</Title>
          <LoremTextContainer>
            <p>Welcome to Mentor-Mentee-Portal  !!</p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">Admin Register</AdminRegisterLink>
        </SchoolInfo>
        <SchoolImage src={bg} alt="pupils" />
      </HomeContainer>
    </>
  );
};

export default Home;
