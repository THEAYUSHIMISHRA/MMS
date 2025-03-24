import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BsGraphUp,
  BsFileText,
  BsGraphDown,
  BsCalendar,
  BsBook,
  BsChatDots,
  BsGear,
} from 'react-icons/bs';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  height: 100%;
  background-color: #2c3e50; /* Dark blue background */
  color: white;
  overflow-y: auto; /* Enable vertical scrolling */
  padding-top: 60px;
  transition: width 0.3s ease; /* Smooth width transition */
  z-index: 100; /* Ensure sidebar stays above content */
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e; /* Darker border */
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e; /* Darker background on hover */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  transition: margin 0.3s ease;
  display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
`;

const SidebarIcon = styled.div`
  margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  font-size: 20px;
`;

const Logo = styled.img`
  width: ${({ isOpen }) => (isOpen ? '100px' : '50px')};
  height: auto;
  transition: width 0.3s ease;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: -15px;
  width: 30px;
  height: 30px;
  background-color: #34495e;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleIcon = styled.span`
  color: white;
  font-size: 16px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo src="/logo1.png" alt="Logo" isOpen={isOpen} />
        {isOpen && <h3>Student</h3>}
      </SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsGraphUp />
          </SidebarIcon>
          <StyledLink to="/student/dashboard" isOpen={isOpen}>
            Dashboard
          </StyledLink>
        </SidebarNavItem>
        {/* <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsFileText />
          </SidebarIcon>
          <StyledLink to="/student/assignments" isOpen={isOpen}>
            Assignments
          </StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsFileText />
          </SidebarIcon>
          <StyledLink to="/student/exams" isOpen={isOpen}>
            Exams
          </StyledLink>
        </SidebarNavItem> */}
        {/* <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsGraphDown />
          </SidebarIcon>
          <StyledLink to="/student/performance" isOpen={isOpen}>
            Performance
          </StyledLink>
        </SidebarNavItem> */}
        <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsCalendar />
          </SidebarIcon>
          <StyledLink to="/student/attendance" isOpen={isOpen}>
            Attendance
          </StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsBook />
          </SidebarIcon>
          <StyledLink to="/student/events" isOpen={isOpen}>
            Events
          </StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsChatDots />
          </SidebarIcon>
          <StyledLink to="/student/communication" isOpen={isOpen}>
            Announcement
          </StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsGear />
          </SidebarIcon>
          <StyledLink to="/student/settings" isOpen={isOpen}>
            Profile
          </StyledLink>
        </SidebarNavItem>
        {/* <SidebarNavItem>
          <SidebarIcon isOpen={isOpen}>
            <BsGear />
          </SidebarIcon>
          <StyledLink to="/" isOpen={isOpen}>
            Logout
          </StyledLink>
        </SidebarNavItem> */}
      </SidebarNav>
      {/* <ToggleButton onClick={toggleSidebar}>
        <ToggleIcon isOpen={isOpen}>▲</ToggleIcon>
      </ToggleButton> */}
    </SidebarContainer>
  );
};

export default Sidebar;
