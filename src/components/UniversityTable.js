// src/UniversityTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UniversityTable = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios.get('http://universities.hipolabs.com/search?country=United+States')
      .then(response => {
        setUniversities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Universities in the United States</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>State</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university, index) => (
            <tr key={index}>
              <td>{university.name}</td>
              <td>{university.country}</td>
              <td>{university['state-province']}</td>
              <td><a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityTable;