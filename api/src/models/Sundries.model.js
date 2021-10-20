import mongoose from 'mongoose';

const SundriesSchema = mongoose.Schema(
    {
      headline: {
        type: String,
        required: [true, 'headline is required']
      },
      copy: {
        type: String,
        required: [true]
      },
      images: {
        type: Array,
        required: [false]
      },
      date: {
        type: String,
        required: [false]
      },
    },
    {
      timestamps: true
    }
)

export default mongoose.model('Sundries', SundriesSchema, 'sundries');

