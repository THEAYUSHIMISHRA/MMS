import React, { useContext, useEffect, useRef, useState } from 'react'
import { CardContainer, Section, SectionTitle, StudentDashboardContainer } from '../../styles/DashboardStyles'
import Sidebar from './Sidebar'
import { Content } from '../../styles/AnnouncementStyles'
import { FormContainer, InputField, SubmitButton } from '../../styles/TeacherSignInStyles'
import contexts from '../../components/ContextApi'

export default function JoinTeam() {
	const { ContextDetails } = useContext(contexts)

	const [Link, setLink] = useState('')
	const [SubmitBtn, SetSubmitBtn] = useState('Join')
	const [teams, setTeams] = useState([])
	const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const fetchTeams = async () => {
		const studentId = ContextDetails.StudentId;
		const email = ContextDetails.StudentEmail;
        if (!email || !studentId) {
            setError('Please enter both Email and Student ID');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:4000/api/team/get-matching-teams/${email}/${studentId}`);
            
            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'No matching teams found');
                setTeams([]);
            } else {
                const data = await response.json();
                setTeams(data.teams);
                console.log("Teams:", data.teams);
            }
        } catch (error) {
            setError('Error fetching teams: ' + error.message);
            setTeams([]);
        } finally {
            setLoading(false);
        }
    };


	const handleSignIn = async (e) => {
		e.preventDefault();
		if (isSubmitting) return; 
		const match = Link.match(/join-team\/([A-Za-z0-9]+)/);
		if (!match) {
			alert("Invalid join link format. Please use the correct link.");
			return;
		}

		setIsSubmitting(true);
  		try {
    		// ... existing code ...
  		} finally {
    	setIsSubmitting(false);
    	SetSubmitBtn("Join");
  		}
		
		const teamId = match[1];
		const studentEmail = ContextDetails.StudentEmail;
		console.log(teamId);
		const studentId = ContextDetails.StudentId;
		const email = ContextDetails.StudentEmail;

		if (!Link) {
			alert('Please fill in all required fields');
			return;
		}

		try {

			SetSubmitBtn("Joining...")
			const response = await fetch(`http://localhost:4000/api/team/join-team/${teamId}`,{
				method: 'POST',
  				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: studentEmail }),
		});

			const data = await response.json();

			if (response.ok) {
				alert('Join in successfully!');
				setLink('');
				SetSubmitBtn("Join")
			} else {
				SetSubmitBtn("Join")
				alert(data.message || 'Failed to Join');
			}
		} catch (error) {
			alert('Error occurred: ' + error.message);
			SetSubmitBtn("Join")
		}
	};

	useEffect(()=>{

		if (!ContextDetails.StudentId || !ContextDetails.StudentEmail) {
			console.error("Student ID or Email missing in context");
			return;
		}
		fetchTeams()
	},[ContextDetails.StudentId, ContextDetails.StudentEmail]);
	return (
		<div>
			<StudentDashboardContainer>
				<Sidebar />
				<Content>
					<Section >
						<div style={{ display: "flex", justifyContent: "center" }}>
							<FormContainer onSubmit={handleSignIn}>
								<h1>Join Team</h1>
								{/* Common Fields */}
								<InputField style={{ width: "95%" }}
									type="text"
									placeholder="Enter Join Link"
									value={Link}
									onChange={(e) => setLink(e.target.value)}
									required
								/>
								<SubmitButton as="button"  type="submit">{SubmitBtn}</SubmitButton>

							</FormContainer></div>
					</Section>
					{/* <Section> */}
					{/* <SectionTitle>Upcoming Events</SectionTitle> */}
					{/* Add a calendar or list of upcoming events */}
					{/* </Section> */}

					{/* Add more sections for other parts of the admin dashboard */}
					<Section>
                        <SectionTitle>Matching Teams</SectionTitle>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <CardContainer>
                            {teams.length > 0 ? (
                                teams.map((team, index) => {
									console.log(team)
									return(
										// <a href='#' id={team._id}>
                                    	<div key={index}  
										onClick={() => setLink(`http://localhost:4000/join-team/${team.teamId}`)} 
										style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                                        <h3>{team.teamName}</h3>
										<p>Team ID: {team.teamId}</p>
                                        {/* <p>Leader: {team.leaderEmail}</p> */}
                                        <p>Members: {team.students.length}</p>
                                        <ul>
                                            {team.students.map((member, idx) => (
                                                <li key={idx}>
                                                    {member.name} - {member.email}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
									// </a>
                                )})
                            ) : (
                                !loading && <p>No teams found.</p>
                            )}
                        </CardContainer>
                    </Section>

				</Content>
			</StudentDashboardContainer>
		</div>
	)
}

