import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StudentSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(29, 70, 111); /* Techy blue background */
  min-height: 100vh; /* Full height */
  padding: 20px;
`;
export const Logo2 = styled.img`
  width: 150px;
  margin-top: 0px;
  margin-bottom: 120px;
  animation: glow 2s ease-in-out infinite;
  filter: drop-shadow(0 0 10px white);

  @keyframes glow {
    0% { filter: drop-shadow(0 0 5px white); }
    50% { filter: drop-shadow(0 0 15px white); }
    100% { filter: drop-shadow(0 0 5px white); }
  }
    `;
export const Heading = styled.h2`
  color: white; /* White text */
  font-size: 26px; /* Larger heading */
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: -60px; /* Moves heading closer to the top */
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px; /* Increased width for better spacing */
  padding: 22px;
  border-radius: 10px;
  background-color: white; /* White form background */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 5px solid black;
  padding-left: 25px;  /* Side padding added */
  padding-right: 25px; /* Side padding added */
`;

export const InputField = styled.input`
  width: 91%;
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
