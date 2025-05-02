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
  SubmitButton,
  StudentEmail
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
        initialData[student.id] = { present: false, absent: false }; // No status initially
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
      const formattedData = students.map(student => {
        const statusObj = attendanceData[student._id];
        let status = null;
        if(statusObj.present) { status = "Present"; }
        else if(statusObj.absent) { status = "Absent"; }
        return {
          student: student._id, // Use correct MongoDB ObjectId field
          status,
          date: attendanceDate  // You can optionally add this field if needed
        };
      }).filter(record => record.status !== null); // Ignore unchecked students

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
              const { present, absent } = attendanceData[student._id] || {};

              return (
                <React.Fragment key={student._id}>
                  <AttendanceItem>
                    <StudentName>{student.name}</StudentName>
                    <StudentEmail>{student.email}</StudentEmail>

                    <CheckboxLabel>
                      <input
                        type="radio"
                        name={`status-${student._id}`}
                        checked={present}
                        onChange={() => handleCheckboxChange(student._id, 'present')}
                      />
                      Present
                    </CheckboxLabel>

                    <CheckboxLabel>
                      <input
                        type="radio"
                        name={`status-${student._id}`}
                        checked={absent}
                        onChange={() => handleCheckboxChange(student._id, 'absent')}
                      />
                      Absent
                    </CheckboxLabel>
                  </AttendanceItem>
                  {filteredStudents.length - 1 !== student._id && <Divider />}
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
