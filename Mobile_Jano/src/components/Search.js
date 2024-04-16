import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 15%;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
    
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 0.5rem;
    
  }

  .results {
    margin-top: 1rem;
  }

  .pagination {
    margin-top: 1rem;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
   
    
  }

  th {
    background-color: #f2f2f2;
    color:#333;
    
    
  }

  @media only screen and (max-width: 768px) {
    input[type="text"] {
      width: 80%;
      margin: 0 auto;
      display: block;
    }
  }
`;

function App() {
  const [deviceName, setDeviceName] = useState('');
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/gadget/device/${deviceName}`);
      setResult(response.data);
      setCurrentPage(1); // Reset to first page after each search
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setResult(null);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredResults = result && result.documents
    ? result.documents.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const totalPages = Math.ceil(result?.documents?.length / pageSize);
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(startPage + 2, totalPages);
  startPage = Math.max(1, endPage - 2);
  const pagesToShow = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => startPage + i);

  return (
    <AppContainer>
       <div className="pagination"><input
        type="text"
        id="deviceName"
        label="Device name"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button></div>
      <div className="results">
        {filteredResults.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>DeviceName</th>
                <th>Announced</th>
                <th>Status</th>
                <th>NetworkTechnology</th>
                <th>Weight</th>
                <th>DisplayType</th>
                <th>DisplaySize</th>
                <th>OS</th>
                <th>Chipset</th>
                <th>CPU</th>
                <th>Camera</th>
                <th>Colors</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((document, index) => (
                <tr key={index}>
                  <td>{document.DeviceName !== undefined ? document.DeviceName : 'Announcement not available'}</td>
                  <td>{document.Announced !== undefined ? document.Announced : 'SIM information not available'}</td>
                  <td>{document.Status !== undefined ? document.Status : 'DeviceName information not available'}</td>
                  <td>{document.NetworkTechnology !== undefined ? document.NetworkTechnology : 'NetworkTechnology information not available'}</td>
                  <td>{document.Weight !== undefined ? document.Weight : 'Weight information not available'}</td>
                  <td>{document.DisplayType !== undefined ? document.DisplayType : 'DeviceName information not available'}</td>
                  <td>{document.DisplaySize !== undefined ? document.DisplaySize : 'DeviceName information not available'}</td>
                  <td>{document.OS !== undefined ? document.OS : 'DeviceName information not available'}</td>
                  <td>{document.Chipset !== undefined ? document.Chipset : 'DeviceName information not available'}</td>
                  <td>{document.CPU !== undefined ? document.CPU : 'DeviceName information not available'}</td>
                  <td>{document.Camera !== undefined ? document.Camera : 'DeviceName information not available'}</td>
                  <td>{document.Colors !== undefined ? document.Colors : 'DeviceName information not available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
      {result && result.documents && result.documents.length > pageSize ? (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          {pagesToShow.map((pageNumber) => (
            <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      ) : null}
    </AppContainer>
  );
}

export default App;
