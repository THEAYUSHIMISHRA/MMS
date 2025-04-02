import React, { useState, useEffect } from "react";

const TeacherDetails = ({ teachers, setTeachers }) => {  
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null); // Track hover state

  useEffect(() => {
    const savedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    if (savedTeachers.length > 0 && teachers.length === 0) {
      setTeachers(savedTeachers);
    }
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher)
      .filter(value => typeof value === "string") 
      .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.heading}>Teacher Details</h2>
      
      {/* Bigger Search Bar */}
      <div style={styles.searchBarContainer}>
        <input 
          type="text"
          placeholder="Search Teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      <div style={styles.container}>
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher, index) => (
            <div 
              key={index}
              style={{
                ...styles.card,
                ...(hoveredCard === index ? styles.cardHover : {}), // Apply hover effect
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 
                style={{
                  ...styles.name,
                  ...(hoveredCard === index ? { color: "#222" } : {}), // Ensure name is visible
                }}
              >
                {teacher.name}
              </h3>
              <p style={styles.detail}><strong>Department:</strong> {teacher.department}</p>
              <p style={styles.detail}><strong>Specialization:</strong> {teacher.specialization}</p>
              <p 
  style={{
    ...styles.email,
    ...(hoveredCard === index ? styles.emailHover : {}),
  }}
>
  <strong>Email:</strong> {teacher.email}
</p>
            </div>
          ))
        ) : (
          <p style={styles.noData}>No teachers found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "20px",
    textAlign: "center",
    background: "linear-gradient(135deg, rgb(41, 106, 176), #2c2c2c)", // Keeping your original background
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
  },
  searchBarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchBar: {
    width: "60%",
    height: "50px",
    fontSize: "1.2rem",
    padding: "10px",
    borderRadius: "25px",
    border: "2px solid #ffaa00",
    outline: "none",
    textAlign: "center",
    color: "white",
    transition: "0.3s",
    boxShadow: "0px 0px 8px rgba(255, 204, 0, 0.5)",
    caretColor: "black", // Cursor (caret) color is black
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    background: "#ffffff", // White card
    padding: "20px",
    borderRadius: "12px",
    color: "#222", // Black text
    border: "2px solid #ccc", // Light border for definition
    transition: "0.3s",
    textAlign: "left",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transform: "scale(1)",
  },
  cardHover: {
    background: "linear-gradient(135deg, rgb(235, 197, 45), rgb(239, 177, 53))",
    color: "white", // White text on hover
    boxShadow: "0px 0px 20px rgba(255, 204, 0, 0.8)",
    border: "2px solid rgba(255, 204, 0, 0.8)",
    transform: "scale(1.05)",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    fontFamily: "Poppins, sans-serif",
    color: "#222", // Black text
    transition: "color 0.3s ease",
  },
  detail: {
    fontSize: "1rem",
    fontFamily: "Montserrat, sans-serif",
    opacity: "0.9",
    color: "#333", // Dark gray text
  },
  email: {
    fontSize: "0.9rem",
    fontFamily: "Montserrat, sans-serif",
    opacity: "0.8",
    fontStyle: "italic",
    color: "#444", // Slightly darker for visibility
    transition: "color 0.3s ease",
  },
  emailHover: {
    color: "darkblue", // Email turns sky blue on hover
  },
  noData: {
    color: "white",
    fontSize: "1.2rem",
    textAlign: "center",
  },
};
export default TeacherDetails;