
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementContent,
} from '../../styles/AnnouncementStyles';

const Announcement = () => {
  // State for managing announcement
  const [announcement, setAnnouncement] = useState('');
  const [files, setFiles] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
      console.log("Fetched Announcements:", response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDownload = (file) => {
    try {
      // conver base64 to downloadable file
      const link = document.createElement('a');
      link.href = file.data; // Already a Base64 data URL
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Error downloading file');
      console.error('Download error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
  if (!announcement && files.length === 0) {
    toast.error('Please enter announcement or upload files');
    return;
  }

    const formData = new FormData();
    formData.append("announcement", announcement);
    
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post('http://localhost:4000/api/v1/announcements/', formData,{
        headers: { "Content-Type": "multipart/form-data" }, // Ensure that the key matches the backend model
      });

      console.log('Announcement sent:', response.data);
      toast.success('Announcement sent successfully');
      setAnnouncement('');
      setFiles([]);
      fetchAnnouncements();

    } catch (error) {
      console.error('Error sending announcement:', error);
      // Display error toast message
      toast.error('Error sending announcement');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/announcements/${id}`);
      toast.success('Announcement deleted successfully');
      setAnnouncements(announcements.filter(item => item._id !== id)); // Remove deleted item from state
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Error deleting announcement');
    }
  };
  
  return (
    <AnnouncementContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        <Title>Announcement</Title>
        {/* Announcement Form */}
        <AnnouncementForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="announcement">Announcement:</Label>
            <TextArea
              id="announcement"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              required
              rows={4}
              cols={50}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="files">Upload Files:</Label>
            <input type="file" id="files" multiple onChange={handleFileChange} />
          </FormGroup>
          <Button type="submit">Send Announcement</Button>
          <Button type="button" onClick={() => setAnnouncement('')}>Clear Announcement</Button>
        </AnnouncementForm>

        {/* Display Announcements */}
        <h2>Announcements Done:</h2>
        <AnnouncementList>
          {announcements.map((announcement) => (
            <AnnouncementItem key={announcement._id}>
              <AnnouncementContent>{announcement.announcement}</AnnouncementContent>

              {announcement.files.map((file, index) => (
                <div key={index}>
                  <Button onClick={() => handleDownload(file)}>
                    {file.filename} ({file.contentType})
                  </Button>
                </div>
              ))}
              
              {/* <div>
                <button onClick={() => handleDelete(announcement._id)}>Delete</button>
              </div> */}
              <Button onClick={() => handleDelete(announcement._id)}>Delete Announcement</Button>
            </AnnouncementItem>
          ))}
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default Announcement;
