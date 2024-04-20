import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  flex-direction: column;
  min-height: 75vh;
  justify-content: center;
  text-align: center;

  .space {
    margin-top: 50px;
  }

  .search-container {
    margin-bottom: 2rem;
    margin-top: 2.5rem;
  }

  input[type="text"] {
    padding: 0.5rem;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 20%;
    font-size: 1rem;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    &:focus {
      outline: none;
      box-shadow: 0 0 5px #007bff;
    }
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
  }

  .results {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .device-card {
    border: 1px solid #ccc;
    color: #551a8b;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
    width: 50%;
    font-size: 1.0rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: all 0.3s ease;
    text-align: left;
  }

  .device-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .device-card > div {
    margin-bottom: 0.5rem;
  }

  .show-more {
    cursor: pointer;
    color: #007bff;
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    .device-card {
      width: calc(50% - 2rem);
    }
    input[type="text"] {
      width: 80%;
    }
  }

  @media only screen and (max-width: 576px) {
    .device-card {
      width: calc(100% - 2rem);
    }
    input[type="text"] {
      width: 90%;
    }
  }
`;

function App() {
  const [deviceName, setDeviceName] = useState('');
  const [result, setResult] = useState(null);
  const [showMore, setShowMore] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/gadget/device/${deviceName}`);
      setResult(response.data);
      // Initialize showMore state for each device
      const initialShowMoreState = {};
      if (response.data && response.data.documents && response.data.documents.length > 0) {
        response.data.documents.forEach((document, index) => {
          initialShowMoreState[index] = false;
        });
      }
      setShowMore(initialShowMoreState);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setResult(null);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const toggleShowMore = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index],
    }));
  };

  return (
    <AppContainer>
      <h1 className="space">Search Your Phone</h1>
      <div className="search-container">
        <input
          type="text"
          id="deviceName"
          placeholder="Enter device name"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {result && result.documents && result.documents.length > 0 ? (
          result.documents.map((document, index) => (
            <div className="device-card" key={index}>
              <div>
                <strong>Device Name:</strong> {document.DeviceName !== undefined ? document.DeviceName : 'Announcement not available'}
              </div>
              {showMore[index] && (
                <>
                  {Object.entries(document).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value || 'Information not available'}
                    </div>
                  ))}
                </>
              )}
              <div className="show-more" onClick={() => toggleShowMore(index)}>
                {showMore[index] ? 'Show Less' : 'Show More'}
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
