import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNav({teamId,styles}) {
  return (
	<div>	 <div style={styles.sidebar}>
			<h2 style={styles.logo}><span >Mentor-Mentee</span></h2>
			<ul style={styles.navList}>
			  <li style={styles.navItem}>
				{/* <Link to="/dashboard" style={styles.navLink}>Dashboard</Link> */}{/* by client */}
				<Link to={"/teams/team/"+teamId} style={styles.navLink}>Dashboard</Link>{/* by Dev */}
			  
			  </li>
			  <li style={styles.navItem}>
				<Link to={"/teams/details/"+teamId} style={styles.navLink}>Team Details</Link>
			  </li>
			  {/* <li style={styles.navItem}>
				<Link to={"/teams/TPerformance/"+teamId} style={styles.navLink}>TPerformance</Link>
			  </li> */}
			  <li style={styles.navItem}>
				<Link to="/" style={styles.navLink}>Logout</Link>
			  </li>
			</ul>
		  </div>
</div>
  )
}
