import { useState } from "react";
import api from "../utils/axios";

const ApiTest = () => {
  const [results, setResults] = useState([]);

  const testEndpoint = async (method, url, data = null) => {
    try {
      const response = await api[method](url, data);
      setResults(prev => [...prev, { url, status: response.status, success: true, data: response.data }]);
    } catch (error) {
      setResults(prev => [...prev, { url, status: error.response?.status, success: false, error: error.response?.data || error.message }]);
    }
  };

  const runTests = () => {
    setResults([]);
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    
    // Test address endpoint
    testEndpoint('post', '/addresses', {
      full_name: "Test User",
      phone_number: "254712345678",
      address_line: "123 Test St",
      city: "Nairobi",
      postal_code: "00100",
      address_type: "billing"
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>API Connectivity Test</h1>
      <p>Base URL: {api.defaults.baseURL}</p>
      <p>Token: {localStorage.getItem('token') ? '✅ Present' : '❌ Missing'}</p>
      <button onClick={runTests} style={{ padding: '1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Run Test
      </button>
      
      <div style={{ marginTop: '2rem' }}>
        {results.map((result, i) => (
          <div key={i} style={{ padding: '1rem', margin: '1rem 0', background: result.success ? '#e8f5e9' : '#ffebee', borderRadius: '4px' }}>
            <h3>{result.success ? '✅' : '❌'} {result.url}</h3>
            <p>Status: {result.status}</p>
            <pre>{JSON.stringify(result.success ? result.data : result.error, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;
