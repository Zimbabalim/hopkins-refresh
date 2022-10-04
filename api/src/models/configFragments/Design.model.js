import mongoose from 'mongoose';

const DesignSchema = mongoose.Schema(
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

export default mongoose.model('Design', DesignSchema, 'config_designs');

