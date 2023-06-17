import React, { useState, useEffect } from "react";



const SearchBar = ({ updateUsersFromSearch, usersAfterEveryDeletion}) => {
   
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch =(event) =>{    //for setting the search term in state
      setSearchTerm(event.target.value.toLowerCase())
  }

  useEffect(()=> {  // whenver the search term is set in the state, search function executes
  
    search(searchTerm.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[searchTerm])

  const search = (key) => {
    if( key !== ''){

    const filteredUsers = usersAfterEveryDeletion.filter((user) => (user.name.toLowerCase().includes(key)   //includes also matches substring 
                                  ||    user.email.toLowerCase().includes(key)
                                  ||    user.role.toLowerCase().includes(key)))                                                    
    updateUsersFromSearch(filteredUsers); 
    }
    else {
     
      updateUsersFromSearch(usersAfterEveryDeletion);
      
    }
  
  }
  
  return (
    <>
    <div className="input-group mb-3">
        <input type="text" className="form-control" onChange={handleSearch}  placeholder="Search by name, email or role" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
    </div>
    </>
  )
}

export default SearchBar