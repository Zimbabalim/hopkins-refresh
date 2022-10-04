import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './scss/index.scss';
import Layout from './view/Layout';
import Login from './view/Login';
import {connect} from 'react-redux';

function App(props) {

  useEffect(() => {
    console.warn('/App/ -*************************');
    console.warn('/App/ -release: FIXME 28.9.22 : v.1.0.3');
    console.warn('/App/ -*************************');
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
