import mongoose from 'mongoose';

const FooSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Ya gotta add a title mofo']
      }
    },
    {
      timestamps: true
    }
);

export default mongoose.model('Foo', FooSchema, 'aBunchOfFoos');

