import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherProfile = ({ teachers = [], setTeachers }) => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: "",
    department: "",
    email: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacher.name && teacher.department && teacher.email && teacher.specialization) {
      setTeachers([...teachers, teacher]);
      setTeacher({ name: "", department: "", email: "", specialization: "" });
    }
  };

  return (
    <div style={{ 
      background:"  #34495e", 
      minHeight: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      padding: "20px" 
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "550px",  // Wider form
        width: "90%",       
        padding: "30px",
        background: "white", 
        color: "black",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)"
      }}>
        <h1 style={{ fontSize: "30px", marginBottom: "20px", color: "black" }}>
          Teacher Profile System
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {Object.keys(teacher).map((key) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <label htmlFor={key} style={{ 
                marginBottom: "5px", 
                fontSize: "18px", 
                fontWeight: "bold", 
                color: "black" // Now all subheadings are black
              }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>

              {key === "department" ? (
                <select id={key} name={key} value={teacher[key]} onChange={handleChange} 
                  style={{ padding: "12px", fontSize: "18px", borderRadius: "5px", background: "white", color: "black", width: "100%", boxSizing: "border-box", border: "1px solid gray" }}>
                  <option value="">Select Department</option>
                  <option value="School of Automation">School of Automation</option>
                  <option value="APAJI">Aim N Act</option>
                  <option value="SURYA MANDIR">SURYA Mandir</option>
                  <option value="URJA MANDIR">Urja Mandir</option>
                  
                </select>
              ) : (
                <input type="text" id={key} name={key} value={teacher[key]} onChange={handleChange} 
                  style={{ padding: "12px", fontSize: "18px", borderRadius: "5px", background: "white", color: "black", width: "100%", boxSizing: "border-box", border: "1px solid gray" }} 
                  placeholder={`Enter ${key}`} />
              )}
            </div>
          ))}

          <button type="submit" style={{
            background:"  #4ab6e1", color: "white", padding: "12px", fontSize: "18px", border: "none", cursor: "pointer", borderRadius: "5px", marginTop: "10px",
            transition: "background 0.3s ease, transform 0.1s ease, box-shadow 0.2s ease", width: "100%", boxSizing: "border-box"
          }}>
            Add Teacher
          </button>
        </form>

        <button onClick={() => navigate("/teacher-details")} style={{
          background: " #34495e", color: "white", padding: "12px", fontSize: "18px", border: "2px solid blue", cursor: "pointer", borderRadius: "5px", marginTop: "20px",
          transition: "0.3s", width: "50%", boxSizing: "border-box"
        }}>
          View Teacher Details
        </button>
      </div>
    </div>
  );
};

export default TeacherProfile;
