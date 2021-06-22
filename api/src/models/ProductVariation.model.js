import mongoose from 'mongoose';

// TODO not sure if i need this - test via simple js first
const ProductsVariationSchema = mongoose.Schema(
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
        type: String,
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
)

export default mongoose.model('Product', ProductsVariationSchema, 'products_123');

