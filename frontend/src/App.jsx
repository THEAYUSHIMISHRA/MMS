import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from './components/Feedback/FeedbackForm';
import Home from '../src/components/Home.jsx';
import ChooseUser from '../src/components/ChooseUser';
import AdminSignIn from '../src/components/AdminSignIn';
import StudentSignIn from '../src/components/StudentSignIn';
import TeacherSignIn from '../src/components/TeacherSignIn';
import AdminRegister from '../src/components/AdminRegister';
import AboutUs from '../src/components/AboutUs';
import Coordinator from '../src/components/Coordinator';
import StudentUpload from "./pages/Admin/StudentUpload";
import TeacherUpload from "./pages/Admin/TeacherUpload";
import ForgotPassword from '../src/components/forgotpassword';
import verifyotp from '../src/components/verifyotp';
import AdminDashboard from '../src/pages/Admin/Dashboard';
import StudentDashboard from '../src/pages/Students/Dashboard';
import Sidebar from '../src/pages/Students/Sidebar';
import TeacherDashboard from '../src/pages/Teachers/Dashboard';

import AdminFeedbackView from "./components/AdminFeedback/AdminFeedbackView";

import Classes from '../src/pages/Admin/Classes';
import Exam from '../src/pages/Admin/Exam';
import Attendance from '../src/pages/Admin/Attendance';
import Performance from '../src/pages/Admin/Performance';
import Teachers from '../src/pages/Admin/Teachers';
import Students from '../src/pages/Admin/Students';
import Assignments from '../src/pages/Admin/Assignments';
import Library from '../src/pages/Admin/Library';
import EventCalender from '../src/pages/Admin/EventCalender';
import SettingsProfile from '../src/pages/Admin/SettingsProfile';
import Announcement from '../src/pages/Admin/Announcement';

// Student Section Routes
import StudentAssignments from '../src/pages/Students/Assignments';
import ExamSection from '../src/pages/Students/Exams';
import PerformanceSection from '../src/pages/Students/Performance';
import AttendanceSection from '../src/pages/Students/Attendance';
import LibrarySection from './pages/Students/Library';
import CheckEventSection from './pages/Students/Events';
import AnnouncementSection from '../src/pages/Students/Announcement';
import StudentProfile from '../src/pages/Students/Profile';

// Teacher Section Routes
import ClassSection from '../src/pages/Teachers/Classes';
import StudentSection from '../src/pages/Teachers/Students';
import TeacherSection from '../src/pages/Teachers/Teachers';
import CheckPerformanceSection from '../src/pages/Teachers/Performance';
import EventSection from '../src/pages/Teachers/Events';
import TeacherProfileSection from '../src/pages/Teachers/Profile';
import CheckAnnouncementSection from '../src/pages/Teachers/Announcement';
import AssignmentSection from '../src/pages/Teachers/Assignments';
import CheckAttendanceSection from '../src/pages/Teachers/Attendance';
import CheckExamSection from '../src/pages/Teachers/Exams';
import MessagingPage from '../src/pages/Students/MessagingPage';
import TeacherMessagingPage from '../src/pages/Teachers/TeacherMessagingPage';
import Request from './pages/Teachers/Request.jsx';
import TeacherProfile from "./pages/Teachers/TeacherProfile";
import TeacherDetails from "./pages/Teachers/TeacherDetails";

// Team Pages
import TeamRegister from "./pages/Teams/TeamRegister";
import TeamDashboard from "./pages/Teams/TeamDashboard";
import JoinTeamPage from "./pages/Teams/JoinTeamPage";
import TeamDetails from "./pages/Teams/TeamDetails";
import TPerformance from "./pages/Teams/TPerformance";
import TeamLeaderLogin from "./components/TeamLeaderLogin.jsx";
import JoinTeam from "./pages/Students/JoinTeam.jsx";

// Marks Page for Teachers (Newly added)
import Marks from './pages/Teachers/Marks.jsx';
import AdminMarks from "./pages/Admin/AdminMarks";


import contexts from "./components/ContextApi.jsx";

const App = () => {
  const [teachers, setTeachers] = useState([]);
  let [ContextDetails, setContextDetails] = useState({});

  return (
    <contexts.Provider value={{ ContextDetails, setContextDetails }}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose-user" element={<ChooseUser />} />

          {/* Sign-in routes */}
          <Route exact path="/admin-signIn" element={<AdminSignIn />} />
          <Route exact path="/student-signIn" element={<StudentSignIn />} />
          <Route exact path="/teacher-signIn" element={<TeacherSignIn />} />
          <Route exact path="/teacher-signIn/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/student-signIn/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/admin/register" element={<AdminRegister />} />
          <Route exact path="/Team-signIn" element={<TeamLeaderLogin />} />

          {/* Informational Routes */}
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/coordinator" element={<Coordinator />} />
          <Route exact path="/verify-otp" element={<verifyotp />} />

          {/* Dashboard Routes */}
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route exact path="/student/dashboard" element={<StudentDashboard />} />
          <Route exact path="/student/Sidebar" element={<Sidebar />} />

          {/* Admin Routes */}
          <Route exact path="/admin/classes" element={<Classes />} />
          <Route exact path="/admin/exams" element={<Exam />} />
          <Route exact path="/admin/attendance" element={<Attendance />} />
          <Route exact path="/admin/performance" element={<Performance />} />
          <Route exact path="/admin/suploads" element={<StudentUpload />} />
          <Route exact path="/admin/tuploads" element={<TeacherUpload />} />
          <Route exact path="/admin/teachers" element={<Teachers />} />
          <Route exact path="/admin/students" element={<Students />} />
          <Route exact path="/admin/assignments" element={<Assignments />} />
          <Route exact path="/admin/library" element={<Library />} />
          <Route exact path="/admin/communication" element={<Announcement />} />
          <Route exact path="/admin/events" element={<EventCalender />} />
          <Route exact path="/admin/settings" element={<SettingsProfile />} />
          <Route exact path="/admin/feedback" element={<AdminFeedbackView />} />

          {/* Student Routes */}
          <Route exact path="/student/assignments" element={<StudentAssignments />} />
          <Route exact path="/student/Team" element={<JoinTeam />} />
          <Route exact path="/student/exams" element={<ExamSection />} />
          <Route exact path="/student/performance" element={<PerformanceSection />} />
          <Route exact path="/student/attendance" element={<AttendanceSection />} />
          <Route exact path="/student/library" element={<LibrarySection />} />
          <Route exact path="/student/events" element={<CheckEventSection />} />
          <Route exact path="/student/communication" element={<AnnouncementSection />} />
          <Route path="/student/settings" element={<StudentProfile />} />
          <Route path="/student/MessagingPage" element={<MessagingPage />} />
          {/* <Route path="/student/send-request" element={<SendRequest />} /> */}

          {/* Teacher Routes */}
          <Route exact path="/teacher/classes" element={<ClassSection />} />
          <Route exact path="/teacher/students" element={<StudentSection />} />
          <Route exact path="/teacher/teachers" element={<TeacherSection />} />
          <Route exact path="/teacher/assignments" element={<AssignmentSection />} />
          <Route exact path="/teacher/exams" element={<CheckExamSection />} />
          <Route exact path="/teacher/performance" element={<CheckPerformanceSection />} />
          <Route exact path="/teacher/attendance" element={<CheckAttendanceSection />} />
          <Route exact path="/teacher/communication" element={<CheckAnnouncementSection />} />
          <Route exact path="/teacher/events" element={<EventSection />} />
          <Route exact path="/teacher/settings" element={<TeacherProfileSection />} />
          <Route path="/Teacher/messaging" element={<TeacherMessagingPage />} />
          <Route path="/teacher/requests" element={<Request />} />

          {/* Teacher Marks Page (New Route for Marks) */}
          <Route exact path="/teacher/marks" element={<Marks />} />
          <Route path="/admin/marks" element={<AdminMarks />} />


          {/* Team Routes */}
          <Route path="/teams/register" element={<TeamRegister />} />
          <Route path="/teams/team/:teamId" element={<TeamDashboard />} />
          <Route path="/teams/join/:teamId" element={<JoinTeamPage />} />
          <Route path="/teams/details/:teamId" element={<TeamDetails />} />
          <Route path="/teams/TPerformance/:teamId" element={<TPerformance />} />

          {/* Teacher Profile Routes */}
          <Route
            exact
            path="/teacher-profile"
            element={<TeacherProfile teachers={teachers} setTeachers={setTeachers} />}
          />
          <Route
            exact
            path="/teacher-details"
            element={<TeacherDetails teachers={teachers} setTeachers={setTeachers} />}
          />
          <Route path="/teacher/feedback" element={<FeedbackForm />} />
        </Routes>
      </Router>
    </contexts.Provider>
  );
};

export default App;
