import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CleanExit IDE</h1>
        <p>A new era of development.</p>
        <p>Message from backend: <strong>{message || 'Loading...'}</strong></p>
      </header>
    </div>
  );
}

export default App;