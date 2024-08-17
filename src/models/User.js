import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    emergencyContact: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
