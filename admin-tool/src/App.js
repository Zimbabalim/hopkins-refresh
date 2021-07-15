// import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './scss/index.scss';

function App() {


/*  const [res, setRes] = useState(null);
  const [ping, setPing] = useState('fail');
  const [foo, setFoo] = useState('fail');
  
  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.REACT_APP_API_PORT || 3001;
      const res = await axios(`http://localhost:${PORT}/api/test`);
      setRes(res.data);
      console.log('/App/ -fetchData', res.data);
    }
    fetchData().then(r => console.log('/App/ -test --DONE?'));
    
    return () => {};
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.REACT_APP_API_PORT || 3001;
      const res = await axios(`http://localhost:${PORT}/api/ping-db`);
      setPing(res.data.msg);
      console.log('/App/ -fetchData', res.data);
    }
    fetchData().then(r => console.log('/App/ -ping-db --DONE?'));
    
    return () => {};
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.REACT_APP_API_PORT || 3001;
      const res = await axios(`http://localhost:${PORT}/api/foo`);
      setFoo(`${res.data.data.length} items`);
      console.log('.../App/ -fetchData foo:', res.data);
    }
    fetchData().then(r => console.log('/App/ -foo --DONE?'));
    
    return () => {};
  }, [])*/
  
  return (
    <div className="App">
      <h1>FOO</h1>
    </div>
  );
}

export default App;
