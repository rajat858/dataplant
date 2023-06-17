import React from "react";

const Pagination = ({totalUsers,usersPerPage,currentPage, onPageChange}) => {

 // Calculate the total number of pages
 const totalPages = Math.ceil(totalUsers / usersPerPage);
 // Generate an array of page numbers
 const pageNumbers = [];
 for (let i = 1; i <= totalPages; i++) {
   pageNumbers.push(i);
 }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
    <ul className="pagination">

       {/* first page */}
        <li   
          className="page-item"
        >
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
          >
            <i className="bi bi-chevron-double-left" />
          </button>
        </li>
      
       {/* Previous Page */}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled = {currentPage === 1}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>
      
        {/* Numbered Pages */}
      {pageNumbers.map((pageNumber) => {
          return (<li
          key={pageNumber}
          className={`page-item ${
            pageNumber === currentPage ? "active" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>)       
})}

        {/* Next Page */}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled = {currentPage=== totalPages}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>

             {/* Last Page */}
        <li
          className="page-item"
        >
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
          >
            <i className="bi bi-chevron-double-right" />
          </button>
        </li>
      
    </ul>
  </nav>
  )
}
export default Pagination;