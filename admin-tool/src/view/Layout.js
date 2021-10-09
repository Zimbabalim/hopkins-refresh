import React from "react";
import ProductEditor from './productEditor/ProductEditor';
import ImageUploader from './productEditor/ImageUploader';

const Layout = () => {
  return (
      <>
        <h2>Layout</h2>
        <ImageUploader/>
        <ProductEditor />
      </>
  );
};

export default Layout;
