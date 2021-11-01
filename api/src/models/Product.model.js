import mongoose from 'mongoose';
// import ProductsVariationSchema from './ProductVariation.model';

// TODO https://stackoverflow.com/questions/47735867/mongoose-querying-subdocuments
// *** refactor into designs, pattern (verify naming), new route/controller to query ProductsVariationSchema

/*const ProductsVariationSchema = mongoose.Schema(
    {
      default_by_fabric_type: {
        type: Boolean,
        required: [false]
      },
      code: {
        type: String,
        required: [true]
      },
      tags: {
        type: String
        required: [false]
      },
      details: {
        type: String,
        required: [false]
      }
    },
    {
      timestamps: true
    }
)*/


const ProductsSchema = mongoose.Schema(
    {
      friendly_name: {
        type: String,
        required: [true, 'friendly name is required']
      },
      default_product_code: {
        type: String,
        required: [true]
      },
      // variations: [ProductsVariationSchema]
      variations: {
        type: Array,
        required: [false]
      }
      
    },
    {
      timestamps: true
    }
)

export default mongoose.model('Product', ProductsSchema, 'products');

