import mongoose from "mongoose";

const electronicsSchema=new mongoose.Schema({
   deviceType:{
    type:String,
    required:true,
   },
   brandModel:{
    type:String,
    required:true,
   },
   condition:{
    type:String,
    required:true,
   },
   ageOfDevice:{
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

const Electronics=mongoose.model('Electronics',electronicsSchema);

export default Electronics;