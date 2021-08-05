import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../state';


const ProductFilter = (props) => {
  
  useEffect(() => {
    console.log('/ProductFilter/ -???', actions);
  },[]);
  
  const onSubmit = (payload) => {
    console.log('/ProductFilter/ -onSubmit====', payload, props, '>>>', actions);
    // props.dispatch({type: actions.testAction});
    // props.dispatch(actions.testAction({label: 'boo'}));
    props.dispatch(actions.getProductData(
        {path: '/api/product/?partialmatch=true&variations.tags=Organza'}
    ));
    //getProductData
  }
  
  return (
      <>
        <h4>ProductFilter</h4>
        <button onClick={() => {
          onSubmit('foo');
        }}>SUBMIT</button>
        <p>??? {props.testFlag.label}</p>
      </>
  );
};

const mapStateToProps = (state) => {
  console.log('/ProductFilter/ -mapStateToProps', state);
  const {testFlag} = state;
  return {testFlag}
};

export default connect(mapStateToProps, null)(ProductFilter);
