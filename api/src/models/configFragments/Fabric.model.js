import mongoose from 'mongoose';

const FabricSchema = mongoose.Schema(
    {
      code: {
        type: String,
        required: [true]
      },
      label: {
        type: String,
        required: [true]
      },
      uid: {
        type: String,
        required: [true]
      },
    },
    {
      timestamps: true
    }
)

export default mongoose.model('Fabric', FabricSchema, 'config_fabrics');

