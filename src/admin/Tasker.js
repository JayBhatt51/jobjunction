import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const Tasker = () => {
  const [taskers, setTaskers] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedTasker, setEditedTasker] = useState({ area: '', task: '', phone: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${baseurl}/admintasker`)
      .then(response => response.json())
      .then(data => setTaskers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedTasker(taskers[index]);
  };

  const handleSaveChanges = () => {
    if (!validatePhoneNumber(editedTasker.phone)) {
      setErrorMessage('Phone number should be 10 digits long');
      return;
    }

    fetch(`${baseurl}/admintasker/update/${editedTasker._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ area: editedTasker.area, task: editedTasker.task, phone: editedTasker.phone }),
    })
      .then(response => response.json())
      .then(updatedTasker => {
        const updatedTaskers = [...taskers];
        updatedTaskers[editableIndex] = updatedTasker;
        setTaskers(updatedTaskers);
        setEditableIndex(null);
        setErrorMessage('');
      })
      .catch(error => console.error('Error updating tasker:', error));
  };

  const handleCancel = () => {
    setEditableIndex(null);
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTasker(prevState => ({
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
      <h1 className='text-center my-3'>Taskers</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {taskers.map((tasker, index) => (
          <div className="accordion-item" key={tasker._id}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse-${index}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`flush-collapse-${index}`}
              >
                {tasker.name} - {tasker.task}
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
                    <p><strong>Area:</strong> <select name="area" value={editedTasker.area} onChange={handleInputChange} > <option value={editedTasker.area}>Select One</option>
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
                  <option value="Kothariya">Kothariya </option></select></p>
                    <p><strong>Task:</strong> <select name="task" value={editedTasker.task} onChange={handleInputChange} ><option value={editedTasker.task}>Select One</option>
                  {/* Assembly */}
          <option value="General Furniture Assembly">General Furniture Assembly</option>
          <option value="Bookshelf Assembly">Bookshelf Assembly</option>
          <option value="Desk Assembly">Desk Assembly</option>
          <option value="Crib Assembly">Crib Assembly</option>
          <option value="PAX Assembly">PAX Assembly</option>
          
          {/* Mounting */}
          <option value="General Mounting">General Mounting</option>
          <option value="TV Mounting">TV Mounting</option>
          <option value="Mount Shelves">Mount Shelves</option>
          <option value="Install Curtains & Blinds">Install Curtains & Blinds</option>
          <option value="Hang Art">Hang Art</option>
          <option value="Mount Home Decor">Mount Home Decor</option>
          
          {/* Moving */}
          <option value="Help Moving">Help Moving</option>
          <option value="Trash & Furniture Removal">Trash & Furniture Removal</option>
          <option value="Heavy Lifting & Loading">Heavy Lifting & Loading</option>
          <option value="Rearrange Furniture">Rearrange Furniture</option>
          <option value="Junk Haul Away">Junk Haul Away</option>
          <option value="Apartment Moving">Apartment Moving</option>
          
          {/* Cleaning */}
          <option value="Party Clean Up">Party Clean Up</option>
          <option value="Apartment Cleaning">Apartment Cleaning</option>
          <option value="Deep Clean">Deep Clean</option>
          <option value="Garage Cleaning">Garage Cleaning</option>
          <option value="Move Out Clean">Move Out Clean</option>
          <option value="Office Cleaning">Office Cleaning</option>
          
          {/* OutdoorHelp */}
          <option value="Yard Work">Yard Work</option>
          <option value="Lawn Care">Lawn Care</option>
          <option value="Snow Removal">Snow Removal</option>
          <option value="Landscaping Help">Landscaping Help</option>
          <option value="Branch & Hedge Trimming">Branch & Hedge Trimming</option>
          <option value="Gardening & Weeding">Gardening & Weeding</option>
          
          {/* HomeRepairs */}
          <option value="Door, Cabinet, & Furniture Repair">Door, Cabinet, & Furniture Repair</option>
          <option value="Wall Repair">Wall Repair</option>
          <option value="Sealing & Caulking">Sealing & Caulking</option>
          <option value="Appliance Installation & Repairs">Appliance Installation & Repairs</option>
          <option value="Window & Blinds Repair">Window & Blinds Repair</option>
          <option value="Flooring & Tiling Help">Flooring & Tiling Help</option>
          <option value="Electrical Help">Electrical Help</option>
          <option value="Plumbing Help">Plumbing Help</option>
          <option value="Light Carpentry">Light Carpentry</option>
          
          {/* Painting */}
          <option value="Indoor Painting">Indoor Painting</option>
          <option value="Wallpapering">Wallpapering</option>
          <option value="Outdoor Painting">Outdoor Painting</option>
          <option value="Concrete & Brick Painting">Concrete & Brick Painting</option>
          <option value="Accent Wall Painting">Accent Wall Painting</option>
          <option value="Wallpaper Removal">Wallpaper Removal</option> </select></p>
                    <p><strong>Phone:</strong> <input type="text" name="phone" value={editedTasker.phone} onChange={handleInputChange} /></p>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button onClick={handleSaveChanges} className="btn btn-primary btn-sm mx-2">Save Changes</button>
                    <button onClick={handleCancel} className="btn btn-danger btn-sm">Cancel</button>
                  </>
                ) : (
                  <>
                    <p><strong>Area:</strong> {tasker.area}</p>
                    <p><strong>Task:</strong> {tasker.task}</p>
                    <p><strong>Phone:</strong> {tasker.phone}</p>
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

export default Tasker;
