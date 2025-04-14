// ChooseUser.jsx
import React from 'react';
import logoImage from '../assets/logo1.png'; // ✅ Correct image path
import { ChooseUserContainer, UserSection, Title, Button, Logo, BoxWrapper } from '../styles/ChooseUserStyles';
import { Link } from 'react-router-dom';

const ChooseUser = () => {
  return (
    <ChooseUserContainer>
      <Logo src={logoImage} alt="Logo" />
      <BoxWrapper>
        <UserSection>
          <Title>Admin</Title>
          <Button to="/admin-signIn">Login as Admin</Button>
        </UserSection>
        <UserSection>
          <Title>Student</Title>
          <Button to="/student-signIn">Login as Student</Button>
        </UserSection>
        <UserSection>
          <Title>Teacher</Title>
          <Button to="/teacher-signIn">Login as Teacher</Button>
        </UserSection>
        {/* <UserSection>
          <Title>Team</Title>
          <Button to="/team-signIn">Login for Team</Button>
        </UserSection> */}
      </BoxWrapper>
    </ChooseUserContainer>
  );
};

export default ChooseUser;
