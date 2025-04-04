import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TeacherSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(29, 70, 111); /* Techy blue background */
  min-height: 100vh; /* Full height */
  padding: 20px;
`;
export const Logo = styled.img`
  width: 100px; /* Small logo */
  height: auto;
  margin-bottom: 115px; /* Reduced space below the logo */
  margin-top: -100px; /* Moves the logo higher */
`;
export const Heading = styled.h2`
  color: white; /* White text */
  font-size: 28px; /* Large heading */
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: -50px; /* Moves heading closer to the top */
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px; /* Increased width for better spacing */
  padding: 25px;
  border-radius: 10px;
  background-color: white; /* White form background */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid rgb(29, 70, 111);
  font-size: 16px;
  background-color: white;
  color: black;
  text-align: center;
  outline: none;
  
  &:focus {
    border: 2px solid rgb(29, 50, 90);
  }
`;

export const SubmitButton = styled(Link)`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50; /* Matching theme */
  color: white;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #4CAF50;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
