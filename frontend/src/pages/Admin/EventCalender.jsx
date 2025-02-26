// EventCalendar.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  EventCalendarContainer,
  Content,
  // CalendarContainer,
  Events,
  Event,
  AddEventForm,
  EventInput,
  AddEventButton,
  // ErrorText,
} from '../../styles/EventCalendarStyles';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState(null);

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      
      //console.log("Fetched events:", response.data);

      if (!response.data.success || !response.data.events) {
        console.error("No events found.");
        return;
      }

      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      //setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', {
        event: newEvent,
      });
      setEvents([...events, response.data.event]);
      setNewEvent('');
      setError(null);
    } catch (error) {
      console.error('Error adding event:', error);
      setError(error.response?.data?.error || 'Error adding event');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/events/${id}`);
  
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      setError(error.response?.data?.error || "Error deleting event");
    }
  };

  return (
    <EventCalendarContainer>
      <Sidebar />
      <Content>
        <h1 align="center">Events & Calendar</h1>
        <div><h3>Current Time: {new Date().toLocaleString()}</h3></div>
        {/* <CalendarContainer>
          {/* Display Calendar Here */
          /* For example: <Calendar /> */
          // /* Calendar */ </CalendarContainer> */
        }
        <h2>Add Event</h2>
        <AddEventForm onSubmit={addEvent}>
          <EventInput
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter Event"
          />
          <AddEventButton type="submit">Add Event</AddEventButton>
        </AddEventForm>
        {/* {error && <ErrorText>{error}</ErrorText>} */}
        <Events>
          <h2>Events List:</h2>
          { events.length > 0 ? (
            events.map((event) => (
            <Event key={event._id}>{event.event}
            <br />
            <button onClick={() => deleteEvent(event._id)}>Delete Event</button>
            </Event>
          ))) : (
          <p>No events found</p>
        ) }
        </Events>
      </Content>
    </EventCalendarContainer>
  );
};

export default EventCalendar;
