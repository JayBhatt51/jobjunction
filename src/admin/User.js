import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const User = () => {
  const [users, setUsers] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({ phone: '', area: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${baseurl}/adminuser`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedUser(users[index]);
  };

  const handleSaveChanges = () => {
    if (!validatePhoneNumber(editedUser.phone)) {
      setErrorMessage('Phone number should be 10 digits long');
      return;
    }

    fetch(`${baseurl}/adminuser/update/${editedUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: editedUser.phone, area: editedUser.area }),
    })
      .then(response => response.json())
      .then(updatedUser => {
        const updatedUsers = [...users];
        updatedUsers[editableIndex] = updatedUser;
        setUsers(updatedUsers);
        setEditableIndex(null);
        setErrorMessage('');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleCancel = () => {
    setEditableIndex(null);
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to validate phone number format
  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  return (
    <>
      <h1 className='text-center my-3'>User</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {users.map((user, index) => (
          <div className="accordion-item" key={user._id}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse-${index}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`flush-collapse-${index}`}
              >
                {user.name}
              </button>
            </h2>
            <div
              id={`flush-collapse-${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                {editableIndex === index ? (
                  <>
                    <p><strong>Phone:</strong> <input type="text" name="phone" value={editedUser.phone} onChange={handleInputChange} /></p>
                    <p><strong>Area:</strong> <select name="area" value={editedUser.area} onChange={handleInputChange}>
                    <option value={editedUser.area}>Select One</option>
                  <option value="Shyamnagar">Shyamnagar </option>
                  <option value="Railnagar">Railnagar </option>
                  <option value="Bhagvatipara">Bhagvatipara</option>
                  <option value="Morbi Road">Morbi Road </option>
                  <option value="IMA">IMA </option>
                  <option value="Kabirvan">Kabirvan </option>
                  <option value="Ram Park">Ram Park </option>
                  <option value="Redcross Sadar">Redcross Sadar </option>
                  <option value="Redcross Ramnathpara">Redcross Ramnathpara</option>
                  <option value="Nana Mauva">Nana Mauva</option>
                  <option value="Aambedkarnagar">Aambedkarnagar </option>
                  <option value="Vijayplot">Vijayplot </option>
                  <option value="Nandanvan">Nandanvan </option>
                  <option value="Mavdi">Mavdi </option>
                  <option value="Narayannagar">Narayannagar </option>
                  <option value="AHMP">AHMP </option>
                  <option value="Champaknagar">Champaknagar </option>
                  <option value="Hudko">Hudko </option>
                  <option value="Pranami Chowk">Pranami Chowk </option>
                  <option value="New Raghuvir">New Raghuvir </option>
                  <option value="Kothariya">Kothariya </option>
                    </select></p>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button onClick={handleSaveChanges} className="btn btn-primary btn-sm mx-2">Save Changes</button>
                    <button onClick={handleCancel} className="btn btn-danger btn-sm">Cancel</button>
                  </>
                ) : (
                  <>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Area:</strong> {user.area}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={() => handleEdit(index)} className="btn btn-secondary btn-sm mx-2">Edit</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
