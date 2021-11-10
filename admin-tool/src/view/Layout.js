import React from "react";
import ProductEditor from './productEditor/ProductEditor';
import NavigationBar from './NavigationBar';
import UserEditor from './userEditor/UserEditor';
import SundriesEditor from './sundriesEditor/SundriesEditor';
import Brand from './Brand';

const Layout = () => {
  return (
      <>
        <NavigationBar/>
        <Brand/>
        <UserEditor routeIndex={0}/>
        <ProductEditor routeIndex={1}/>
        <SundriesEditor routeIndex={2}/>
      </>
  );
};

export default Layout;
