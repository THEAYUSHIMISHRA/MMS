import express, { json } from "express";
import Team from "../models/Team.js";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";

const router = express.Router();

// Register a new team
router.post("/register", async (req, res) => {
  const { teamName, students } = req.body;
  try {
    console.log("Received registration request:", req.body)
      
      // Step 1: Extract course letters
      const uniqueCourses = [...new Set(students.map(student => student.course?.[0] || ""))].join("");

      // Step 2: Count existing teams with the same prefix
      const teamCount = await Team.countDocuments({ teamId: new RegExp(`^${uniqueCourses}`) }) + 1;

      // Step 3: Generate serial number
      const serialNumber = String(teamCount).padStart(2, "0");
      // Generate the team ID
      const teamId = `${uniqueCourses}${serialNumber}`;

      if (!students || students.length === 0) {
        return res.status(400).json({ message: "At least one student is required to form a team" });
      }

       // Create and save the team
       const newTeam = new Team({
        teamId,
        teamName,
        students: students.map(student => ({
          name: student.name,  
          email: student.email,
          studentId: student.studentId,
          course: student.course,
        })),
    });

      const savedTeam = await newTeam.save();

      console.log("Saved team members with IDs:", savedTeam.students);

      // Send email invitations with proper IDs
      try {
          // Send invitation emails to team members
          for (const student of savedTeam.students) {
            if (!student.email) {
              console.error("Skipping email: No recipient defined for student", student);
              continue; // Skip if email is missing
            }
              await sendEmail(
                  student.email,
                  `Join Team ${teamName}`,
                  
                  `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background: #ffffff; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <h2 style="color: #333; margin: 0 0 20px;">Join Our Team</h2>

                        <!-- Join Button -->
                      
                        <!-- Steps Section -->
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                        <h3 style="color: #333;">Steps to Join:</h3>
                        <ol style="text-align: left; color: #555; font-size: 14px; line-height: 22px; padding-left: 20px;">
                            <li>Copy this link - (http://localhost:4000/api/team/join-team/${savedTeam.teamId})</li>
                            <li>Login to the student panel</li>
                            <li>Go to the 'Join Team' section</li>
                            <li>Insert the link</li>
                            <li>Click join</li>
                        </ol>
                    </td>
                </tr>
            </table>`
                  
              );
              console.log("Member ID:", student.studentId);  
          }

          // Create the table with the actual team data
          const body = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2c3e50; text-align: center;">You are the team leader!</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <thead>
                      <tr>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Team Name</th>
                          // <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Leader Email</th>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Team ID</th>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Password</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.teamName}</td>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.students}</td>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.teamId}</td>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.password}</td>
                      </tr>
                  </tbody>
              </table>
          </div>`;

          // Send email to team leader
          await sendEmail(
              students,
              `You have created Team ${teamName}`,
              body
          );

          res.status(201).json({ 
              message: "Team registered successfully! Invitations sent.", 
              teamId: savedTeam.teamId,
              password: savedTeam.password
          });

      } catch (emailError) {
          console.error("Error sending emails:", emailError.message);
          return res.status(500).json({ 
              message: "Team registered, but email sending failed", 
              error: emailError.message 
          });
      }

  } catch (error) {
      console.error("Error registering team:", error.message);
      res.status(400).json({ 
          message: "Error registering team", 
          error: error.message 
      });
  }
});

router.get("/courses", async (req, res ) => {

  const teams = await Team.find({}, "students"); // Fetch only students field
    let allCourses = [];

    teams.forEach(team => {
      team.students.forEach(student => {
        allCourses.push(student.course);
      });
    });

  // Extract unique first letters from each course
  const uniqueLetters = [...new Set(allCourses.map(course => course?.charAt(0) || ""))].join('');

  // Count existing teams to generate a unique serial number
  const teamCount = await Team.countDocuments() + 1;

  res.json({ teamId: `${uniqueLetters}${String(teamCount).padStart(2, '0')}` });
});

// Join a team (member clicks the link)
router.post("/join-team/:teamId", async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;

  console.log(teamId,email);
  try {

    const team = await Team.findOne({ teamId });

    if (!team) return res.status(404).json({ message: "Team not found" });
    
    const student = team.students.find((m) => m.email === email );
    if (!student) return res.status(400).json({ message: "Not invited to this team" });

    if (!student.studentId) return res.status(400).json({ message: "Student ID not found in the team data" });

    // student.studentId = studentId; // Mark as joined
    student.joined = true;
    await team.save();
    // res.status(200).json({ message: "Successfully joined!", studentId: student.studentId });
    try {
      await sendEmail(email, "Welcome to the team!", `You have joined ${team.teamName}`);
      res.status(200).json({ message: "You have joined the team!" });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError.message);
    }

    const htmlResponse = `
    <html>
      <head>
        <title>Team Joined</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #4CAF50; }
          p { color: #555; }
          ul { list-style: none; padding: 0; }
          li { padding: 5px 0; }
          .footer { margin-top: 20px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>You have joined the team!</h1>
          

          <div class="footer">
            <p>Thank you for joining the team!</p>
          </div>
        </div>
      </body>
    </html>
  `;
  res.send(htmlResponse)
    // res.json({ message: "You have joined the team!", teamDetails: team });
  } catch (error) {
    res.status(500).json({ message: "Error joining team", error: error.message });
  }
});
// router.get("/join-team/:teamId/:studentId/:email", async (req, res) => {
//   const { teamId ,email, studentId} = req.params;
  
//   console.log(teamId)
//   try {
//     const team = await Team.findOne({ teamId });

//     if (!team) return res.status(404).json({ message: "Team not found" });

//     const member = team.students.find((m) => m.email === email);
//     console.log(team.members)

//     if (!member) return res.status(400).json({ message: "Not invited to this team" });

//     if (member.studentId) return res.status(400).json({ message: "You have already joined this team" });

//     member.studentId = studentId; // Mark as joined
//     await team.save();

//     try {
//       await sendEmail(email, "Welcome to the team!", `You have joined ${team.teamName}`);
//     } catch (emailError) {
//       console.error("Error sending welcome email:", emailError.message);
//     }

//     const htmlResponse = `
//     <html>
//       <head>
//         <title>Team Joined</title>
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           h1 { color: #4CAF50; }
//           p { color: #555; }
//           ul { list-style: none; padding: 0; }
//           li { padding: 5px 0; }
//           .footer { margin-top: 20px; font-size: 12px; color: #888; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>You have joined the team!</h1>
          

//           <div class="footer">
//             <p>Thank you for joining the team!</p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;
//   // return res.redirect(`http://localhost:4000/team-dashboard/${teamId}`);
//   res.send(htmlResponse)
//     // res.json({ message: "You have joined the team!", teamDetails: team });
//   } catch (error) {
//     res.status(500).json({ message: "Error joining team", error: error.message });
//   }
// });

router.get("/Teamlogin", async (req, res) => {
  const { teamId, password } = req.query;  // Use query parameters for GET requests
  console.log(teamId, password,req.query)
  try {
      // Convert Ids to ObjectId
      const objectId = new mongoose.Types.ObjectId(teamId);

      // Use `findOne()` with ObjectId and password
      const team = await Team.findOne({ _id: objectId, password: password });

      if (!team) {
          return res.status(404).json({ message: "Team not found or incorrect password" });
      }

      res.status(200).json(team);

  } catch (error) {
      console.error("Error fetching team:", error.message);
      res.status(500).json({ message: "Error fetching team", error: error.message });
  }
});
// NEW: Fetch team by ID
router.get("/:teamId", async (req, res) => {
  const { teamId } = req.params;
  console.log(`Received teamId:,"${teamId}"`);
  try {
    const team = await Team.findOne({ teamId: String(teamId) });
    if (!team) {
      console.log("Team not found in DB for ID:", teamId);
      return res.status(404).json({ message: "Team not found" });
    }
    console.log("Team found:", team);
    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error.message);
    res.status(500).json({ message: "Error fetching team", error: error.message });
  }
});

// ✅ NEW: Fetch Team Performance by ID
router.get("/:teamId/performance", async (req, res) => {
  const { teamId } = req.params;
  try {
    const team = await Team.findOne(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json({
      teamName: team.teamName,
      students: team.students,
      teamId: team.teamId,
      performance: team.performance || [],
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching team performance", error: error.message });
  }
});

// ✅ NEW: Update Team Performance
router.post("/:teamId/performance", async (req, res) => {
  const { teamId } = req.params;
  const { studentId, marks, attendance } = req.body;

  try {
    const team = await Team.findOne(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const member = team.members.find((m) => m.studentId === studentId);
    if (!member) return res.status(404).json({ message: "Student not found in this team" });

    // Update performance
    team.performance = team.performance || [];
    const existingRecord = team.performance.find((p) => p.studentId === studentId);

    if (existingRecord) {
      existingRecord.marks = marks;
      existingRecord.attendance = attendance;
    } else {
      team.performance.push({ studentId, marks, attendance });
    }

    await team.save();
    res.json({ message: "Performance updated successfully!", performance: team.performance });
  } catch (error) {
    res.status(500).json({ message: "Error updating performance", error: error.message });
  }
});

// ✅ NEW: Fetch All Teams (for Dashboard)
router.get("/all-teams", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
});

router.get("/get-matching-teams/:email/:studentId", async (req, res) => {
  const { email, studentId } = req.params;
  console.log(`Searching for student with email: ${email} and studentId: ${studentId}`);
 
  if (!email || !studentId) {
      return res.status(400).json({ message: "Email and Student ID are required" });
  }

  try {
      // Find teams with matching email and studentId in members array
      const teams = await Team.find({
        students: {
              $elemMatch: {
                  email: { $regex: new RegExp(email, "i") },
                  studentId: { $regex: new RegExp(studentId, "i") },
              },
          },
      });
      res.status(200).json({ teams });
      console.log(`Found teams: ${teams.length}`);
      
      if (teams.length === 0) {
          return res.status(404).json({ message: "No matching teams found" });
      }

      res.status(200).json({
          message: "Matching teams found",
          teams
      });

  } catch (error) {
      console.error("Error fetching teams:", error.message);
      res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
});

export default router;
