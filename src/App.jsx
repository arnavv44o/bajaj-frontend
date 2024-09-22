import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
    { value: 'file_valid', label: 'File Valid' },
    { value: 'file_mime_type', label: 'File MIME Type' },
    { value: 'file_size_kb', label: 'File Size (KB)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponseData(null);
    setSelectedOptions([]);

    let parsedData;
    try {
      parsedData = JSON.parse(jsonInput);
    } catch (err) {
      setError('Invalid JSON format.');
      return;
    }

    if (!parsedData.data || !Array.isArray(parsedData.data)) {
      setError('JSON must contain a "data" array.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/bfhl', parsedData);
      setResponseData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred while processing your request.'
      );
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Enter JSON, e.g., { "data": ["A", "C", "z"] }'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="5"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {responseData && (
        <div className="dropdown-container">
          <h2>Select Data to Display:</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            className="multi-select"
            classNamePrefix="select"
          />
        </div>
      )}
      {responseData && selectedOptions.length > 0 && (
        <ResponseDisplay response={responseData} selected={selectedOptions} />
      )}
    </div>
  );
}

export default App;
