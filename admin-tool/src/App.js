import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
function App() {
  
  
  const [res, setRes] = useState(null);
  const [ping, setPing] = useState('fail');
  const [foo, setFoo] = useState('fail');
  
  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.REACT_APP_API_PORT || 3001;
      const res = await axios(`http://localhost:${PORT}/test`);
      setRes(res.data);
      console.log('/App/ -fetchData', res.data);
    }
    fetchData().then(r => console.log('/App/ -test --DONE?'));
    
    return () => {};
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.REACT_APP_API_PORT || 3001;
      const res = await axios(`http://localhost:${PORT}/ping-db`);
      setPing(res.data.msg);
      console.log('/App/ -fetchData', res.data);
    }
    fetchData().then(r => console.log('/App/ -ping-db --DONE?'));
    
    return () => {};
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.REACT_APP_API_PORT || 3001;
      const res = await axios(`http://localhost:${PORT}/foo`);
      setFoo(`${res.data.data.length} items`);
      console.log('.../App/ -fetchData foo:', res.data);
    }
    fetchData().then(r => console.log('/App/ -foo --DONE?'));
    
    return () => {};
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>TEST: {res}</p>
        <p>PING: {ping}</p>
        <p>FOO: {foo}</p>
      </header>
    </div>
  );
}

export default App;
