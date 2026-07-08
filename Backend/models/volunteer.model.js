import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    volunteerRole: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer; 