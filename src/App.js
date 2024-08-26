import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [bodyData, setBodyData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Inspect the structure here
        setBodyData(data.Body[0]); // Assuming there's only one item in the Body array
        setTimelineData(data.Timeline); // Set Timeline data
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  return (
    <div className="App">
      <h1>JSON Timeline</h1>
      
      {bodyData ? (
        <div className="body-section">
          <h2>About</h2>
          <div dangerouslySetInnerHTML={{ __html: bodyData.About }} />
        </div>
      ) : (
        <p>Loading About section...</p>
      )}

      <h2>Timeline</h2>
      {Array.isArray(timelineData) && timelineData.length > 0 ? (
        <ul>
          {timelineData.map((item, index) => (
            <li key={index}>
              <h3>{item.Title}</h3>
              <p>{item.Description}</p>
              <p><strong>Episode:</strong> {item.Episode}</p>
              <p><strong>Create Date:</strong> {item.CreateDate}</p>
              <img src={`https://arthurfrost.qflo.co.za/php/${item.Image}`} alt={item.Title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No timeline data available</p>
      )}
    </div>
  );
}

export default App;
