import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './scss/index.scss';
import Layout from './view/Layout';

function App() {

  useEffect(() => {
    console.log('/App/ -STARTUP');
  }, []);
  
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
