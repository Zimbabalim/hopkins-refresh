import mongoose from 'mongoose';

const ProductsSchema = mongoose.Schema(
    {
      friendly_name: {
        type: String,
        required: [true, 'friendly name is required']
      },
      default_product_code: {
        type: String,
        required: [false]
      },
      variations: {
        type: Array,
        required: [false]
        
        //default_by_fabric_type
        //code
        //tags
        //details
      },
    },
    {
      timestamps: true
    }
)

export default mongoose.model('Product', ProductsSchema, 'products_123');

