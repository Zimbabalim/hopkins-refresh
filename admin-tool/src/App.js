import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './scss/index.scss';
import Layout from './view/Layout';
import Login from './view/Login';
import {connect} from 'react-redux';

function App(props) {

  useEffect(() => {
    console.log('/App/ -STARTUP');
  }, []);
  
  return (
    <div className="App">
      {!props.hasAuthed && (
          <Login />
      )}
      {props.hasAuthed && (
          <Layout />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const {hasAuthed} = state;
  return {hasAuthed}
};

export default connect(mapStateToProps, null)(App);
