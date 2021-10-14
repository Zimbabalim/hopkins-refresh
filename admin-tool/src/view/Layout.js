import React from "react";
import ProductEditor from './productEditor/ProductEditor';
import NavigationBar from './NavigationBar';
import UserEditor from './userEditor/UserEditor';

const Layout = () => {
  return (
      <>
        <NavigationBar/>
        <UserEditor routeIndex={0}/>
        <ProductEditor routeIndex={1}/>
      </>
  );
};

export default Layout;
