import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "", course: "" }]);
  const navigate = useNavigate();

  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "", course: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/team/register", {
        teamName,
        leaderEmail,
        members,
      });
      alert("Team registered successfully! Invitations sent.");
      navigate(`/Teams/team/${response.data.teamId}`);
    } catch (error) {
      console.error("Error registering team:", error);
      alert("Failed to register team. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(29, 70, 111)",
        padding: "20px",
      }}
    >
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
          ))}

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
    </div>
  );
};

export default TeamRegister;
