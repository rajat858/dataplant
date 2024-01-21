import React, { useState, useEffect } from "react";
import './add.css';


const Add = ({ }) => {
   
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };
  const handleSubmit = () => {
    // Perform actions with the entered data (customize this part)
    console.log('Form data:', formData);

    // Close the popover form
    closePopover();
  };
  
  return (  
    <div>
    <button className="btn btn-danger custom-color" onClick={openPopover} ><i className="bi bi-plus-circle mx-1"></i>Add</button>
    {showPopover && (
        <div className="popover-container">
          <h6 className="text-left">Add Schedule</h6>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />

            <button className="btn btn-danger custom-color" type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-light cancel-color" type="button" onClick={closePopover}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  )
  }

export default Add