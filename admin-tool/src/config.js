const config = {
  api: {
    getProductByName: '/api/product/?partialmatch=true&friendly_name=',
    getProductByTags: '/api/product/?partialmatch=true&variations.tags=',
    updateProduct: '/api/product/',
    uploadImages: '/api/asset/uploadImages',
  }
}

export default config;
