import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTaskPopup.css'; // Import CSS file for styling
import { baseurl } from '../baseurl';
const AddTaskPopup = ({ onClose,setMessage }) => {
  const [task, setTaskName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseurl}/admintasks/addtask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task, category, price })
      });

      if (response.ok) {
        onClose();
        // Optionally, you can navigate to another page upon successful addition
        setMessage('Task Added Successfully')
        navigate('/adminpanel/admintasks');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('An error occurred while adding the task');
    }
  };

  return (
    <div className="popup-background">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input type="text" value={task} onChange={(e) => setTaskName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn">Submit</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
