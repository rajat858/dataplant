import React, { useState, useEffect } from "react";
import './add.css';


const Add = ({ addData, Data , updateData }) => {
   
  const [showPopover, setShowPopover] = useState(false);
  const [formData, setFormData] = useState({
     id: '',
    name: '',
    email: '',
    role: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    var n = Data.length;
    //console.log(n);
    setFormData({
      ...formData,
      id: (n+1).toString(),
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
      var newData = [...Data, formData];
      addData(newData);
      updateData(newData);
    closePopover();
  };
  
  return (  
    <div>
    <button className="btn btn-danger custom-color" onClick={openPopover} ><i className="bi bi-plus-circle mx-1"></i>Add</button>
    {showPopover && (
        <div className="popover-container">
          <h6 className="text-left">Add Schedule</h6>
          <form>
          <div class="form-container">
          <div class="form-row">
            <label className = "form-label" htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-input"
              id="title"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Sample Title"
              required
            />
            </div>
            
            <div class="form-row">
            <label className = "form-label" htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="form-input"
              name="email"
              type = "text"
              value={formData.email}
              onChange={handleInputChange}
              rows="2"
              placeholder="Lorem Ipsum dolor sit amet..."
              required
            ></textarea>
            </div>
            
            <div class="form-row">
            <label className = "form-label" htmlFor="subject">Subject:</label>
            <input
              type="text"
              className="form-input"
              id="subject"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Sample Subject"
              required
            />
            </div>
            </div>

            
            <button className="btn btn-danger custom-color submit" type="button" onClick={handleSubmit}>
              Submit
            </button>
            
            
            <button className="btn btn-light cancel-color cancel" type="button" onClick={closePopover}>
              Cancel
            </button>
            
          </form>
        </div>
      )}
    </div>
  )
  }

export default Add