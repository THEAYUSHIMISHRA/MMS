import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AdminSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(29, 70, 111); /* Techy Background */
  min-height: 100vh;
`;
export const Logo1 = styled.img`
  width: 100px; /* Small logo */
  height: auto;
  margin-bottom: 95px; /* Reduced space below the logo */
  margin-top: -90px; /* Moves the logo higher */
`;
export const Heading = styled.h2`
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: -30px; /* Moves the heading closer to the top */
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 350px;
  padding: 25px;
  border-radius: 10px;
  background-color: white; /* Form Background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const SubmitButton = styled(Link)`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    transform: scale(0.97); /* visually shows a press */
    background-color: #3e9144; /* darker shade on click */
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
