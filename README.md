# Mentor-Mentee Management System
A web-based platform designed to connect mentors and mentees for structured learning, guidance, and progress tracking. The system facilitates easy onboarding, communication, and progress evaluation between users.

##  Features
- Mentee and Mentor Registration/Login
- Profile Management
- Mentee-Mentor Matching
- Session Scheduling & Calendar Integration
- Attendance and marks Tracking
- Chat/Messaging System
- feedback Reports
- Admin Dashboard
- announcements and event handling
- submission of srs/sds and reports

 ## 🛠 Tech Stack
- Frontend: React / HTML, CSS, JavaScript / TailwindCSS
- Backend: Node.js / Express
- Database: MongoDB / MySQL
- Authentication: JWT / OAuth


## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repo
```bash
git clone https://github.com/Swadha-Sri/MMS.git

2.Navigate to the project directory
cd MMS
SPLIT TERMINAL AND RUN FRONTEND AND BACKEND SEPERATELY
- cd backend     -cd frontend

3.Install dependencies
npm install

4.Set up your .env file (DB URI, JWT Secret, etc.)

5.Run the app
-npm start(FOR BACKEND)
-npm run dev(FOR FRONTEND)




Package     	      Purpose
express	            Backend server framework
mongoose	          MongoDB object modeling
dotenv	            Load environment variables from .env
cors	              Enable Cross-Origin requests
bcryptjs	          Password hashing
jsonwebtoken	      Token-based authentication
nodemailer          For email/OTP support
socket.io           For real-time messaging
express-validator   For input validation
axios       	      For API requests
react-router-dom	  For routing between pages
tailwindcss	        For styling
postcss,autoprefixer	Required for Tailwind
nodemon	            Automatically restarts the server on changes
