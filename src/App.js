import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedJson = JSON.parse(jsonInput);

      // Update the URL to point to your backend
      const res = await axios.post('http://localhost:5000/bfhl', parsedJson);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or API error');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div><strong>Alphabets:</strong> {alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div><strong>Numbers:</strong> {numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div><strong>Highest Lowercase Alphabet:</strong> {highest_lowercase_alphabet.join(', ')}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE7503</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON data...'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <select multiple onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <div className="response">
            {renderResponse()}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
