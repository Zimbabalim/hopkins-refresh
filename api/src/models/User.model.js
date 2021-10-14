import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: [false]
        },
        email: {
            type: String,
            required: [true, 'must have an email']
        },
        full_name: {
            type: String,
            required: [true, 'must have full name']
        },
        swatches: { // *** deprecated - TODO remove from all users
            type: Array,
            required: [false]
        },
        rich_swatches: {
            type: Array,
            required: [false]
        },
        user_log: {
            type: Array,
            required: [false]
        },
        user_notes: {
            type: String,
            required: [false]
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema, 'users_456');

