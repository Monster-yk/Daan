import mongoose from "mongoose";

const toysSchema=new mongoose.Schema({
   toyType:{
    type:String,
    required:true,
   },
   ageOfToy:{
    type:String,
    required:true,
   },
   quantity:{
    type:Number,
    required:true,
   },
   condition:{
    type:String,
    required:true,
   },
   collectionAddress:{
    type:String,
    required:true,
   },
   additionalNotes:{
    type:String,
    default:'none',
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
},{timestamps:true});

const Toys=mongoose.model('Toys',toysSchema);

export default Toys;