import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/attendance';

function App() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    const res = await axios.get(API_URL);
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    await axios.post(API_URL, { name });
    setName('');
    fetchAttendance();
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 30 }}>
      <h2>Attendance Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Mark Attendance</button>
      </form>
      <h3>Attendance Records</h3>
      <ul>
        {attendance.map(record => (
          <li key={record._id}>
            {record.name} - {new Date(record.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;