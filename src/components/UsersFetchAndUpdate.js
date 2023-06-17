import React, { useEffect, useState } from "react";
import axios from 'axios';
import Dtable from "./Table";
import SearchBar from "./searchBar";
import Pagination from "./pagination";

const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

 const UsersFetchAndUpdate = () => {
 const [users, setUsers] = useState([]);
 const [firstRender, setFirstRender] = useState(true);
 const [currentPage, setCurrentPage] = useState(1); // Current page number
 const [usersPerPage] = useState(10); // Number of users to show per page
  const [usersAfterEveryDeletion, setUsersAfterEveryDeletion] = useState([]) // For providing SearchBar updated users after deletion in the table.
 
useEffect(()=> {
  const userDetails= async ()=> {
    try{
     const response = await axios.get(API_URL);
     setUsers(response.data);
     setUsersAfterEveryDeletion(response.data);
     setFirstRender(false);

    }
    catch (error) {
      console.error("Error Getting Data",error);
    }
  }
  userDetails();
},[])

const handleInput = (event, userid, field) =>{
  
setUsers((users) => {
  return users.map((user) => {
    if (user.id === userid) {
      return { ...user, [field]: event.target.value }; //square brackets around field allows it to be dynamic
    }
    return user;
  })})
  
}

const updateCancelledUser = (currentUser) => {   //updating the cancelled user back to the users object array
  setUsers((users) => {
   return users.map((user) => {
     if(user.id === currentUser[0].id){
       return {...user, name: currentUser[0].name, email: currentUser[0].email, role: currentUser[0].role}
     }
     return user //the same user should be sent if "if" condion is not triggered
    })
 })
  }

const handleDelete = (id) => {
  setUsers((users) => {
    return users.filter((user) => user.id !== id) //keeping/filtering users not equal to id
  })
  setUsersAfterEveryDeletion((users) => {
    return users.filter((user) => user.id !== id) //keeping/filtering users not equal to id
  })
 }

const DeleteSelected = (ids) => { // when delete selected button is clicked
  setUsers((users) => {
    return users.filter((user) => !ids.includes(user.id))
  })

  setUsersAfterEveryDeletion((users) => {
    return users.filter((user) => !ids.includes(user.id))
  })
 }
//--------------------------------Search Users update----------------------------------------
const updateUsersFromSearch = (filteredUsers) =>  //this gets filtered users from search to re-render
 {
  setUsers(filteredUsers);
  setCurrentPage(1); // Reset the current page to 1 when search updates
 }
//console.log(users[0]);
// -----------------------Pagination users update------------------------------------------

// Logic to get current users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  

// Function to handle page change
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
  
};

if(firstRender) {
  return (<div>
    fetching Data....
  </div>)
}

return (
  <>
  <div className="container mt-5">
  <SearchBar updateUsersFromSearch = {updateUsersFromSearch} usersAfterEveryDeletion = {usersAfterEveryDeletion}/>
  <Dtable users = {currentUsers}
  handleDelete={handleDelete}
  handleInput={handleInput}
  updateCancelledUser={updateCancelledUser}
  DeleteSelected = {DeleteSelected}
  />

  <Pagination 
  totalUsers={users.length}
  usersPerPage={usersPerPage}
  currentPage={currentPage}
  onPageChange={handlePageChange}
   />
  </div>

  
  
  </>
)

}

export default UsersFetchAndUpdate

