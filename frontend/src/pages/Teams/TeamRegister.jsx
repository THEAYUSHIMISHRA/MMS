import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const [teamName, setTeamName] = useState("");
  const [students, setStudents] = useState([{ name: "", email: "", course: "", studentId: "" }]);
  const navigate = useNavigate();

  // const generateTeamId = async (students) => {
  //   if ( !students || students.length === 0) return "T00"
  //   // Extract first letter from each unique course
  //   const uniqueCourses = [...new Set(students.map((m) => m.course?.charAt(0).toUpperCase() || ""))];
    
  //   // Sort letters for consistency
  //   const courseCode = uniqueCourses.sort().join("");
  
  //   try {
  //     // Fetch the total number of teams
  //   const response = await axios.get("http://localhost:4000/api/v1/team/courses");
  //   const totalTeams = response.data.count || 0;

  //   // Generate Team ID (Next number in sequence)
  //   const serialNumber = String(totalTeams + 1).padStart(2, "0");

  //   return `${courseCode}${serialNumber}`;

  //   } catch (error) {

  //     console.error("Error fetching team count:", error);
  //     return `${courseCode}01`; // Default if count fetch fails
  //   }
  // };

  const handleAddMember = () => {
    setStudents([...students, { name: "", email: "", course: "", studentId: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!students || students.length === 0) {
      alert("Please add at least one member to the team.");
      return;
    }

    
    try {
      const response = await axios.post("http://localhost:4000/api/v1/team/register", {
        // teamID,
        teamName,
        students,
      });
      
      const teamId = response.data.teamId;

      alert(`Team registered successfully! Team ID: ${teamId}`);
      //alert("Team registered successfully! Invitations sent.");
      // navigate(`/pages/Teams/team/${response.data.teamId}`);//by client
      navigate(`/teams/team/${teamId}`);//by Dev
    } catch (error) {
      console.error("Error registering team:", error);
      alert("Failed to register team. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register a Team</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Team Name:</label>
          <input type="text" placeholder="Enter Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required style={styles.input} />
        </div>

        {/* <div style={styles.formGroup}>
          <label style={styles.label}>Leader Email:</label>
          <input type="email" placeholder="Enter Leader Email" value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Leader Course:</label>
          <input type="text" placeholder="Enter as CS, AI, IT" value={leaderCourse} onChange={(e) => setLeaderCourse(e.target.value)} required style={styles.input} />

        </div> */}

        <h3 style={styles.subheading}>Team Members</h3>
        {students.map((student, index) => (
          <div key={index} style={styles.memberContainer}>

            <div style={styles.formGroup}>
              <label style={styles.label}>Member {index + 1} Name:</label>
              <input type="text" placeholder="Enter Name" value={student.name} onChange={(e) => setStudents([...students.slice(0, index), { ...student, name: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Member {index + 1} Email:</label>
              <input type="email" placeholder="Enter Email" value={student.email} onChange={(e) => setStudents([...students.slice(0, index), { ...student, email: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Course:</label>
              <input type="text" placeholder="Enter Course" value={student.course} onChange={(e) => setStudents([...students.slice(0, index), { ...student, course: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>
          
            <div style={styles.formGroup}>
              <label style={styles.label}>Member {index + 1} ID:</label>
              <input type="text" placeholder="Enter ID" value={student.studentId} onChange={(e) => setStudents([...students.slice(0, index), { ...student, studentId: e.target.value }, ...students.slice(index + 1)])} pattern="BTBT[CSI]{1}[0-9]{2}[0-9]{3}"
  title="Format: BTBTI22143" />
            </div>
          </div>
        ))}
    {/* <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(29, 70, 111)",
        padding: "20px",
      }}>
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "25px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            marginBottom: "20px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "rgb(29, 70, 111)",
          }}
        >
          Register a Team
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
              Team Name:
            </label>
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              style={{
                width: "93%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid rgb(29, 70, 111)",
                fontSize: "16px",
                backgroundColor: "white",
                color: "black",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
              Leader Email:
            </label>
            <input
              type="email"
              placeholder="Enter Leader Email"
              value={leaderEmail}
              onChange={(e) => setLeaderEmail(e.target.value)}
              required
              style={{
                width: "93%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid rgb(29, 70, 111)",
                fontSize: "16px",
                backgroundColor: "white",
                color: "black",
                marginTop: "5px",
              }}
            />
          </div>

          <h3 style={{ fontSize: "20px", marginTop: "20px", marginBottom: "10px", color: "rgb(29, 70, 111)" }}>
            Team Members
          </h3>

          {members.map((member, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                backgroundColor: "rgb(240, 240, 240)",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
                  Member {index + 1} Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={member.name}
                  onChange={(e) =>
                    setMembers([...members.slice(0, index), { ...member, name: e.target.value }, ...members.slice(index + 1)])
                  }
                  required
                  style={{
                    width: "93%",
                    padding: "12px",
                    borderRadius: "5px",
                    border: "1px solid rgb(29, 70, 111)",
                    fontSize: "16px",
                    backgroundColor: "white",
                    color: "black",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div style={{ textAlign: "left", marginTop: "10px" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
                  Member {index + 1} Email:
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={member.email}
                  onChange={(e) =>
                    setMembers([...members.slice(0, index), { ...member, email: e.target.value }, ...members.slice(index + 1)])
                  }
                  required
                  style={{
                    width: "93%",
                    padding: "12px",
                    borderRadius: "5px",
                    border: "1px solid rgb(29, 70, 111)",
                    fontSize: "16px",
                    backgroundColor: "white",
                    color: "black",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div style={{ textAlign: "left", marginTop: "10px" }}>
                <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
                  Course:
                </label>
                <input
                  type="text"
                  placeholder="Enter Course"
                  value={member.course}
                  onChange={(e) =>
                    setMembers([...members.slice(0, index), { ...member, course: e.target.value }, ...members.slice(index + 1)])
                  }
                  required
                  style={{
                    width: "93%",
                    padding: "12px",
                    borderRadius: "5px",
                    border: "1px solid rgb(29, 70, 111)",
                    fontSize: "16px",
                    backgroundColor: "white",
                    color: "black",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>
          ))} */}

          <button
            type="button"
            onClick={handleAddMember}
            style={{
              padding: "12px",
              backgroundColor: "rgb(29, 70, 111)",
              color: "white",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "0.3s",
              fontWeight: "bold",
              marginLeft: "15px",
              marginRight:"25px",

            }}
          >
            + Add Member
          </button>

          <button
            type="submit"
            style={{
              padding: "12px",
              marginTop: "15px",
              backgroundColor: "rgb(29, 70, 111)",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "0.3s",
              marginLeft: "15px",
              marginRight:"25px",
            }}
          >
            Register Team
          </button>
        </form>
      </div>
    // </div>
    // </form>
    // </div>
    );
};

const styles = {
  container: { padding: "20px" },
  heading: { fontSize: "24px", color: "rgb(29, 70, 111)", marginBottom: "20px",  },
  subheading: { fontSize: "20px", marginTop: "20px", marginBottom: "10px", color: "rgb(29, 70, 111)" },
  form: { maxWidth: "700px", margin: "0 auto" },
  formGroup: { marginBottom: "15px" },
  label: { fontWeight: "bold", display: "block", marginBottom: "5px" },
  input: { width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid rgb(29, 70, 111)" },
  memberContainer: {
    padding: "15px",
    backgroundColor: "rgb(240, 240, 240)",
    borderRadius: "8px",
    marginBottom: "15px",
  },
};

export default TeamRegister;
