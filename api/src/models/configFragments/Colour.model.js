import mongoose from 'mongoose';

const ColourSchema = mongoose.Schema(
    {
      code: {
        type: String,
        required: [true]
      },
      label: {
        type: String,
        required: [true]
      },
      name: {
        type: String,
        required: [true]
      },
    },
    {
      timestamps: true
    }
)

export default mongoose.model('Colour', ColourSchema, 'config_colours');

