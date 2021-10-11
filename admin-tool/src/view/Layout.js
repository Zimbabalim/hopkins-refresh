import React from "react";
import ProductEditor from './productEditor/ProductEditor';
import NavigationBar from './NavigationBar';
import UserEditor from './userEditor/UserEditor';

const Layout = () => {
  return (
      <>
        <NavigationBar/>
        <ProductEditor />
        {/*<UserEditor/>*/}
      </>
  );
};

export default Layout;
