import React from 'react';

function ResponseDisplay({ response, selected }) {
  const dataToDisplay = [];

  selected.forEach((option) => {
    if (option.value === 'alphabets' && response.alphabets) {
      dataToDisplay.push(`Alphabets: ${response.alphabets.join(', ')}`);
    }

    if (option.value === 'numbers' && response.numbers) {
      dataToDisplay.push(`Numbers: ${response.numbers.join(', ')}`);
    }

    if (option.value === 'highest_lowercase_alphabet' && response.highest_lowercase_alphabet) {
      dataToDisplay.push(`Highest Lowercase Alphabet: ${response.highest_lowercase_alphabet}`);
    }

    if (option.value === 'file_valid' && response.file_valid) {
      dataToDisplay.push(`File Valid: ${response.file_valid ? 'Yes' : 'No'}`);
    }

    if (option.value === 'file_mime_type' && response.file_mime_type) {
      dataToDisplay.push(`File MIME Type: ${response.file_mime_type}`);
    }

    if (option.value === 'file_size_kb' && response.file_size_kb) {
      dataToDisplay.push(`File Size (KB): ${response.file_size_kb}`);
    }
  });

  return (
    <div className="response-display">
      <h2>Response:</h2>
      <ul>
        {dataToDisplay.length > 0 ? (
          dataToDisplay.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <p>No data to display</p>
        )}
      </ul>
    </div>
  );
}

export default ResponseDisplay;
