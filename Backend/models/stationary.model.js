import mongoose from "mongoose";

const stationarySchema=new mongoose.Schema({
   itemType:{
    type:String,
    required:true,
   },
   quantity:{
    type:String,
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
   //  required:true,
    default:'none',
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
},{timestamps:true});

const Stationary=mongoose.model('Stationary',stationarySchema);

export default Stationary;