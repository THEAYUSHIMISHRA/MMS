// const forgotPasswordStyles = {
//     container: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f4f4f4",
//     },
//     card: {
//         width: "400px",
//         padding: "30px",
//         borderRadius: "10px",
//         backgroundColor: "#fff",
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         textAlign: "center",
//     },
//     title: {
//         fontSize: "24px",
//         fontWeight: "bold",
//         marginBottom: "15px",
//         color: "#333",
//     },
//     input: {
//         width: "100%",
//         padding: "10px",
//         margin: "10px 0",
//         border: "1px solid #ccc",
//         borderRadius: "5px",
//         fontSize: "16px",
//     },
//     button: {
//         width: "100%",
//         padding: "12px",
//         backgroundColor: "#007bff",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         fontSize: "16px",
//         cursor: "pointer",
//         transition: "0.3s ease",
//     },
//     buttonHover: {
//         backgroundColor: "#0056b3",
//     },
//     link: {
//         marginTop: "10px",
//         fontSize: "14px",
//         color: "#007bff",
//         cursor: "pointer",
//     },
// };

// export default forgotPasswordStyles;



import styled from 'styled-components';

export const ForgotPasswordContainer = styled.div`
  width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const Title = styled.h2`
  text-align: center;
`;

export const Description = styled.p`
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

export const Message = styled.p`
  text-align: center;
  color: red;
`;
