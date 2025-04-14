import React from 'react';
import styled from 'styled-components';
import maam from "../assets/maam.png";
import man from "../assets/sir.png";

const coordinators = [
  {
    name: "Dr. Neelam Sharma",
    designation: "Associate Professor",
    department: "Computer Science",
    email: "sharmaneelam27@gmail.com",
    message: "I am honored to guide students through this mentor-mentee system. Let's grow together!",
    image: maam
  },
  {
    name: "Dr. Deepak Kumar",
    designation: "Assistant Professor",
    department: "Computer Science",
    email: "deepakkumar@banasthali.in",
    message: "Mentorship is the key to success. I am excited to be a part of your journey!",
    image: man
  }
];

const CoordinatorMessage = () => {
  return (
    <Container>
      <Title>Coordinator's Message</Title>
      <CardContainer>
        {coordinators.map((coordinator, index) => (
          <Card key={index}>
            <ImageContainer>
              <Image src={coordinator.image} alt={coordinator.name} />
            </ImageContainer>
            <CardContent>
              <Name>{coordinator.name}</Name>
              <Designation>{coordinator.designation}</Designation>
              <Department>{coordinator.department}</Department>
              <Email href={`mailto:${coordinator.email}`}>{coordinator.email}</Email>
              <Message>{coordinator.message}</Message>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default CoordinatorMessage;

// Styled Components

const Container = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #34495e;
  min-height: 100vh;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 10px rgba(248, 180, 0, 0.6);
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Card = styled.div`
  background: #2c3e50;
  width: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column; /* Key: enables column layout */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4; /* Ensures uniform image shape */
  object-fit: cover;
`;

const CardContent = styled.div`
  background: #ffffff;
  color: #333;
  padding: 20px;
  flex-grow: 1; /* Ensures it fills remaining space */
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  margin: 5px 0;
  color: #34495e;
  font-size: 22px;
`;

const Designation = styled.h3`
  margin: 3px 0;
  font-size: 16px;
  color: #666;
  font-weight: normal;
`;

const Department = styled.h4`
  margin: 3px 0;
  font-size: 14.5px;
  color: #777;
  font-weight: normal;
`;

const Email = styled.a`
  font-size: 16px;
  color: #f39c12;
  text-decoration: none;
  display: block;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    color: blue;
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-top: 10px;
`;

