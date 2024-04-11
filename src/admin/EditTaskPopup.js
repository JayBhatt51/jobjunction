import React, { useState } from 'react';
import './EditTaskPopup.css'; 
import { baseurl } from '../baseurl';
const EditTaskPopup = ({ task, onClose, setMessage }) => {
  // State for the edited task fields
  const [editedTask, setEditedTask] = useState({
    _id: task._id,
    task: task.task,
    category: task.category,
    price: task.price
  });

  // Function to handle changes in the edited task fields with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation rules
    if (name === 'password' && value.length !== 8) {
      setMessage('Password should be 8 characters long');
      return;
    }
    
    if (name === 'email' && !validateEmail(value)) {
      setMessage('Invalid email format');
      return;
    }

    if (name === 'phone' && value.length !== 10) {
      setMessage('Phone number should be 10 digits long');
      return;
    }

    // If validation passes, update the state
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Function to handle the submission of the edited task
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseurl}/admintasks/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTask)
      });

      if (response.ok) {
        setMessage('Task edited successfully');
        onClose();
      } else {
        const data = await response.json();
        setMessage(data.error); // Set error message if editing failed
      }
    } catch (error) {
      console.error('Error editing task:', error.message);
      setMessage('Error editing task');
    }
  };

  // Function to handle the cancellation of editing
  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h2>Edit Task</h2>
        <button onClick={handleCancel} className="close-button">Close</button>
      </div>
      <div className="popup-content">
        <label htmlFor="task">Task:</label>
        <input type="text" id="task" name="task" value={editedTask.task} onChange={handleInputChange} />
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={editedTask.category} onChange={handleInputChange} />
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={editedTask.price} onChange={handleInputChange} />
      </div>
      <div className="popup-actions">
        <button onClick={handleSubmit}>Save</button>
        <button onClick={handleCancel} className="cancel">Cancel</button>
      </div>
    </div>
  );
};

export default EditTaskPopup;
