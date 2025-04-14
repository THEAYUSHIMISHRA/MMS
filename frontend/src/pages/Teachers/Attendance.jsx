// // CheckAttendanceSection.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import { AttendanceContainer, Content, AttendanceContent, AttendanceHeader, AttendanceList, AttendanceItem, StudentName, 
//   CheckboxLabel, Divider, SubmitButton } from '../../styles/AttendanceStyles'; 

// const CheckAttendanceSection = () => {
//   const [students, setStudents] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/v1/students/getall');
//       setStudents(response.data.students);
//       initializeAttendanceData(response.data.students);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const initializeAttendanceData = (students) => {
//     const initialAttendanceData = students.map((student) => ({
//       id: student.id,
//       name: student.name,
//       status: 'Present', // Default to 'Present'
//     }));
//     setAttendanceData(initialAttendanceData);
//   };

//   const handleStatusChange = (id, status) => {
//     const updatedData = attendanceData.map((student) => {
//       if (student.id === id) {
//         return { ...student, status };
//       }
//       return student;
//     });
//     setAttendanceData(updatedData);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Send attendance data to the database
//       const formattedData = attendanceData.map(({ id, name, status }) => ({ studentId: id, name, status }));
//       const response = await axios.post('http://localhost:4000/api/v1/attendance', { attendanceData: formattedData });
//       console.log('Attendance data submitted:', response.data);
//     } catch (error) {
//       console.error('Error submitting attendance data:', error);
//     }
//   };

//   return (
//     <AttendanceContainer>
//       <Sidebar />
//       <Content>
//         <AttendanceContent>
//           <AttendanceHeader>Attendance</AttendanceHeader>
//           <AttendanceList>
//             {students.map((student, index) => (
//               <React.Fragment key={student.id}>
//                 <AttendanceItem>
//                   <StudentName>{student.name}</StudentName>
//                   <CheckboxLabel>
//                     <input
//                       type="checkbox"
//                       checked={attendanceData[index]?.status === 'Present'}
//                       onChange={() => handleStatusChange(student.id, 'Present')}
//                     />
//                     Present
//                   </CheckboxLabel>
//                   <CheckboxLabel>
//                     <input
//                       type="checkbox"
//                       checked={attendanceData[index]?.status === 'Absent'}
//                       onChange={() => handleStatusChange(student.id, 'Absent')}
//                     />
//                     Absent
//                   </CheckboxLabel>
//                   <CheckboxLabel>
//                     <input
//                       type="checkbox"
//                       checked={attendanceData[index]?.status === 'Absent with apology'}
//                       onChange={() => handleStatusChange(student.id, 'Absent with apology')}
//                     />
//                     Absent with apology
//                   </CheckboxLabel>
//                 </AttendanceItem>
//                 {index !== students.length - 1 && <Divider />}
//               </React.Fragment>
//             ))}
//           </AttendanceList>
//           <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
//         </AttendanceContent>
//       </Content>
//     </AttendanceContainer>
//   );
// };

// export default CheckAttendanceSection;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  StudentName,
  CheckboxLabel,
  Divider,
  SubmitButton
} from '../../styles/AttendanceStyles';
import styled from 'styled-components';

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);

      const initialData = {};
      response.data.students.forEach(student => {
        initialData[student.id] = { present: false, absent: false, apology: false }; // No status initially
      });
      setAttendanceData(initialData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCheckboxChange = (studentId, type) => {
    setAttendanceData(prev => {
      const updatedData = { ...prev };
      updatedData[studentId] = {
        present: false,
        absent: false,
        apology: false,
        [type]: true
      };
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    if (!attendanceDate) {
      alert('Please select a date before submitting.');
      return;
    }

    try {
      const formattedData = students.map(student => ({
        studentId: student.id,
        name: student.name,
        date: attendanceDate,
        status: attendanceData[student.id]
      }));

      await axios.post('http://localhost:4000/api/v1/attendance', {
        date: attendanceDate,
        attendanceData: formattedData
      });

      alert('Attendance submitted successfully!');
    } catch (error) {
      console.error('Error submitting attendance data:', error);
      alert('Something went wrong while submitting attendance.');
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>Attendance</AttendanceHeader>

          <Controls>
            <SearchInput
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DateInput
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </Controls>

          <AttendanceList>
            {filteredStudents.map((student) => {
              const { present, absent, apology } = attendanceData[student.id] || {};

              return (
                <React.Fragment key={student.id}>
                  <AttendanceItem>
                    <StudentName>{student.name}</StudentName>

                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={present}
                        onChange={() => handleCheckboxChange(student.id, 'present')}
                      />
                      Present
                    </CheckboxLabel>

                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={absent}
                        onChange={() => handleCheckboxChange(student.id, 'absent')}
                      />
                      Absent
                    </CheckboxLabel>

                    {/* <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={apology}
                        onChange={() => handleCheckboxChange(student.id, 'apology')}
                      />
                      Absent with apology
                    </CheckboxLabel> */}
                  </AttendanceItem>
                  {filteredStudents.length - 1 !== student.id && <Divider />}
                </React.Fragment>
              );
            })}
          </AttendanceList>

          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default CheckAttendanceSection;
