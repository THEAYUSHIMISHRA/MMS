// ChooseUserStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChooseUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: rgb(29, 70, 111);
  background-size: 300% 300%;
  animation: gradientAnimation 6s ease infinite;
  padding: 30px;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

export const Logo = styled.img`
  width: 110px;
  margin-top: 40px;
  margin-bottom: 190px;
  animation: glow 2s ease-in-out infinite;
  filter: drop-shadow(0 0 10px white);

  @keyframes glow {
    0% { filter: drop-shadow(0 0 5px white); }
    50% { filter: drop-shadow(0 0 15px white); }
    100% { filter: drop-shadow(0 0 5px white); }
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;

  @media screen and (min-width: 768px) {
    gap: 40px;
  }
`;

export const UserSection = styled.div`
  text-align: center;
  padding: 30px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.95);
  border: 5px solid rgba(3, 1, 20, 0.8);
  border-radius: 15px;
  box-shadow: 0px 6px 20px rgba(255, 255, 255, 0.6);
  width: 90%;
  max-width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 8px 25px rgba(255, 255, 255, 0.9);
    border: 2px solid #ffcc00;
  }

  @media screen and (min-width: 768px) {
    width: 260px;
  }
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
  text-shadow: 5px 5px 5px rgba(21, 29, 17, 0.5);
  letter-spacing: 1px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export const Button = styled(Link)`
  background: linear-gradient(90deg, #4CAF50, #00C9A7);
  color: white;
  border: none;
  padding: 12px 24px;
  margin-top: 5px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.4);

  &:hover {
    background: linear-gradient(90deg, #00C9A7, #4CAF50);
    box-shadow: 0px 6px 15px rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;
