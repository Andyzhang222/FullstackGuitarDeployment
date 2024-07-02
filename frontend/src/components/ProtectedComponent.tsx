import React, { useEffect, useState } from 'react';

const ProtectedComponent: React.FC = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No token found');
      return;
    }

    fetch('http://localhost:3001/api/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      })
      .catch(error => setError('Error: ' + error.message));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedComponent;