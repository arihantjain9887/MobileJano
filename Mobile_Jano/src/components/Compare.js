import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 30%;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
    margin-left: 1rem;
  }
  .space {
    margin-top: 50px;
    text-align:center;
    margin-bottom: 30px;
  
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 1rem;
  }

  .results {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .device {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
    margin: 0.5rem;
    width: calc(40% - 1rem); /* Adjust width based on number of devices per row */
    background-color: #f9f9f9;
    color: #551a8b;
  }

  .pagination {
    margin-top: 1rem;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    input[type="text"] {
      width: 60%;
    }

    .device {
      width: calc(50% - 1rem);
    }
  }

  @media only screen and (max-width: 576px) {
    input[type="text"] {
      width: 80%;
    }

    .device {
      width: calc(100% - 1rem);
    }
  }
`;

function App() {
  const [deviceNames, setDeviceNames] = useState(['']); // Array to store device names
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = async () => {
    try {
      const uniqueDeviceNames = Array.from(new Set(deviceNames.filter(name => name.trim() !== ''))); // Remove empty strings and duplicates
      const resultsArray = await Promise.all(uniqueDeviceNames.map(async name => {
        const response = await axios.get(`http://localhost:3005/api/gadget/device/${name}`);
        return response.data;
      }));
      setResults(resultsArray);
      setCurrentPage(1); // Reset to first page after each search
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setResults([]);
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

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = currentPage * pageSize;

  return (
    <AppContainer>
      <h1 className="space">Compare your Devices</h1>
      <div className="pagination">
        {deviceNames.map((deviceName, index) => (
          <input
            key={index}
            type="text"
            placeholder="Enter device name"
            value={deviceName}
            onChange={(e) => {
              const newDeviceNames = [...deviceNames];
              newDeviceNames[index] = e.target.value;
              setDeviceNames(newDeviceNames);
            }}
          />
        ))}
        <button onClick={() => setDeviceNames([...deviceNames, ''])}>Add more device</button>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {results.flatMap(result => result.documents).reduce((acc, document) => {
          if (!acc.some(item => item.DeviceName === document.DeviceName)) {
            acc.push(document);
          }
          return acc;
        }, []).slice(startIdx, endIdx).map((document, index) => (
          <div key={index} className="device">
            <div><strong>DeviceName:</strong> {document.DeviceName !== undefined ? document.DeviceName : 'Announcement not available'}</div>
            <div><strong>Announced:</strong> {document.Announced !== undefined ? document.Announced : 'SIM information not available'}</div>
            <div><strong>Status:</strong> {document.Status !== undefined ? document.Status : 'DeviceName information not available'}</div>
            <div><strong>NetworkTechnology:</strong> {document.NetworkTechnology !== undefined ? document.NetworkTechnology : 'NetworkTechnology information not available'}</div>
            <div><strong>Weight:</strong> {document.Weight !== undefined ? document.Weight : 'Weight information not available'}</div>
            <div><strong>DisplayType:</strong> {document.DisplayType !== undefined ? document.DisplayType : 'DeviceName information not available'}</div>
            <div><strong>DisplaySize:</strong> {document.DisplaySize !== undefined ? document.DisplaySize : 'DeviceName information not available'}</div>
            <div><strong>OS:</strong> {document.OS !== undefined ? document.OS : 'DeviceName information not available'}</div>
            <div><strong>Chipset:</strong> {document.Chipset !== undefined ? document.Chipset : 'DeviceName information not available'}</div>
            <div><strong>CPU:</strong> {document.CPU !== undefined ? document.CPU : 'DeviceName information not available'}</div>
            <div><strong>Camera:</strong> {document.Camera !== undefined ? document.Camera : 'DeviceName information not available'}</div>
            <div><strong>Colors:</strong> {document.Colors !== undefined ? document.Colors : 'DeviceName information not available'}</div>
          </div>
        ))}
      </div>
      {results.length > pageSize ? (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          {[...Array(Math.ceil(results.length / pageSize)).keys()].map(pageNumber => (
            <button key={pageNumber + 1} onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
          ))}
          <button onClick={nextPage} disabled={currentPage === Math.ceil(results.length / pageSize)}>Next</button>
        </div>
      ) : null}
    </AppContainer>
  );
}

export default App;
