import React, { useState } from "react";
import './Table.css';

const Dtable = ({users,handleInput, updateCancelledUser, handleDelete, DeleteSelected}) => {

  
  const [editableRowID, setEditableRowID] = useState(null);
  const [cancelledUser, setCancelledUser] = useState([]);
  const [prevID, setPrevID] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]); //this will contain ids in an array for selected rows
  const [isGlobalChkBoxChecked, setIsGlobalChkBoxChecked] = useState(false)
  //----------------------ACTIONS LOGIC------------------------------------------------
  const handleEdit = (userid) => {
    setPrevID([userid])                    // for storing previous row id when changing edit row in the middle of editing 
    if(prevID.length !== 0){            // for defaulting back to original data in the row when data os not saved.
      updateCancelledUser(cancelledUser);
    }
    setCancelledUser( users.filter((user) => user.id === userid) )//to get the current user if  cancelling later without saving
    setEditableRowID(userid)           
   }
  
   const handleCancel = () => {
   let user = cancelledUser;
   updateCancelledUser(user); //sending the user saved at the time of clicking edit to parent for changing the user appropriately.
    setEditableRowID(null);
  }
  const handleSave = () => {
    setEditableRowID(null); //since onInput we are saving changes in the memory , onclick of save button we can just turn the row non editable
  }
  //------------------------------CHECKBOX LOGIC-------------------------------------------------------
  const toggleAllCheckbox = (event) => {
  if(event.target.checked === true){ // to check alll
    setSelectedRows([...users.map((user) => user.id)])
    setIsGlobalChkBoxChecked(true) // when global checkbox is unchecked
  }
  else { //to uncheck all
    setSelectedRows([]);
    setIsGlobalChkBoxChecked(false) // when global checkbox is checked
  }
  }

  

  const toggleSingleCheckbox = (event, userid) => {
    if(selectedRows.includes(userid)){
     setSelectedRows(selectedRows.filter((rowid) => rowid !== userid)) // if userid is present then remove it
    }
    else{
          setSelectedRows([...selectedRows, userid]) // else adding it to thr array
    } 
   }

  const isRowSelected = (userid) => { //for changing row chekboxes
    return selectedRows.includes(userid); //gives either true or false to checked property
  }
  //console.log(users);
  const handleDeleteSelected = () => { // to send the selected to rows to delete selected in parent usersfetchandupdate component
     DeleteSelected(selectedRows);
     setIsGlobalChkBoxChecked(false); // making global checkbox false after delete selected. 
  }

  return (
    <div className="container">
      
      <div>
      
      
      <table className="table table-responsive equal-columns-table">
        <thead>
          <tr>
            <th className="checkboxAlignLeft"><input className="form-check-input" type="checkbox"  id="parentCheckbox" onChange={(event) => toggleAllCheckbox(event)} checked = {isGlobalChkBoxChecked}/></th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="checkboxAlignLeft" ><input className="form-check-input" type="checkbox" id = {user.id} onChange={(event)=> toggleSingleCheckbox(event, user.id)} checked = {isRowSelected(user.id)} /></td>
              <td>{editableRowID === user.id ? (
              <input 
                    type="text" 
                    value={user.name} 
                    onChange={(event)=> handleInput(event,user.id,'name')} />) 
                    : (
                      user.name
                    )}</td>
              
              <td>{editableRowID === user.id ? (
              <input 
                    type="text" 
                    value={user.email} 
                    onChange={(event)=> handleInput(event,user.id,'email')} />) 
                    : (
                      user.email
                    )}</td>
              <td>{editableRowID === user.id ? (
              <input 
                    type="text" 
                    value={user.role} 
                    onChange={(event)=> handleInput(event,user.id,'role')} />) 
                    : (
                      user.role
                    )}</td>

              <td>
                {editableRowID === user.id ? ( <>
                  
                  <i className="bi bi-save text-primary mx-2" onClick={() => handleSave(user.id)}/>
        
                  <i className="bi bi-x-circle text-danger" onClick={handleCancel} />
                </>  
                ): (
                  
                  <div>
                   
                  <i className="bi bi-pencil-square text-primary mx-2" onClick={() => handleEdit(user.id)}></i>
                  
                  <i className="bi bi-trash text-danger" onClick={() => handleDelete(user.id)}></i>
                  </div>
                  
                
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <div id = "deleteSelected" >
        <button className="btn btn-danger " onClick={handleDeleteSelected}>Delete Selected</button>
        
    </div>
    </div>

    
  );
};

export default Dtable;
