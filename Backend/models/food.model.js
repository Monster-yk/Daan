import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    foodType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    expirydate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // slug:{
    //     type:String,
    //     required:true,
    // }
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

export default Food;