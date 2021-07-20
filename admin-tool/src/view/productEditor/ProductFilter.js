import React from "react";

const ProductFilter = () => {
  
  const onSubmit = (payload) => {
    console.log('/ProductFilter/ -onSubmit', payload);
  }
  
  return (
      <>
        <h4>ProductFilter</h4>
        <button onClick={() => {
          onSubmit('foo');
        }}>SUBMIT</button>
      </>
  );
};

export default ProductFilter;
