import React, { useState, useEffect } from "react";
import "./TopDevices.css";

const ProfComponent = () => {
  const [topDevices, setTopDevices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.gsmarena.com");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const devices = [];
        const rows = doc.querySelectorAll(
          ".module.module-rankings.s3 table.module-fit tbody tr"
        );
        rows.forEach((row) => {
          const nameElement = row.querySelector("th a");
          const dailyHitsElement = row.querySelector("td:nth-child(3)");
          if (nameElement && dailyHitsElement) {
            const name = nameElement.textContent.trim();
            const dailyHits = dailyHitsElement.textContent.trim();
            devices.push({ name, dailyHits });
          }
        });
        setTopDevices(devices);
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching the data."
        );
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Daily Hits</th>
              </tr>
            </thead>
            <tbody>
              {topDevices.map((device, index) => (
                <tr key={index}>
                  <td>{device.name}</td>
                  <td>{device.dailyHits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="video-container">
          <iframe
            width="560"
            height="400"
            src="https://www.youtube.com/embed/miTyYHB7EUA?autoplay=1&loop=1"
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ProfComponent;
