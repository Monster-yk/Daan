import Food from '../models/food.model.js';
import Clothes from '../models/clothes.model.js';
import Electronics from '../models/electronic.model.js'
import Stationary from '../models/stationary.model.js'
import Toys from '../models/toys.model.js'
import { errorHandler } from '../utils/error.js';

export const createFood = async (req, res, next) => {
    const{foodType,quantity,expirydate,location}=req.body;

    if(!foodType||!quantity||!expirydate||!location||foodType===''||quantity===''||expirydate===''||location===''||quantity===0){
        next(errorHandler(400,'All field are required'));
    }
    const newfood=new Food({
        ...req.body,
        userId: req.user.id,
    })
    try{
        const savedPost=await newfood.save();
        res.status(200).json(savedPost);
    }catch(error){
        next(error);
    }
}

export const createClothes =async(req,res,next)=>{
    const {typeOfClothing,size,condition,quantity,collectionAddress,additionalNote}=req.body;

    if(!typeOfClothing||!size||!condition||!quantity||!collectionAddress||typeOfClothing===''||size===''||condition===''||quantity===''||collectionAddress===''||quantity===0){
        next(errorHandler(400,'All field are required'));
    }
    const newclothe=new Clothes({
        ...req.body,
        userId: req.user.id,
    })
    try{
        const savedPost=await newclothe.save();
        res.status(200).json(savedPost);
    }catch(error){
        next(error);
    }
}

export const createElectronics=async(req,res,next)=>{
    const {deviceType,brandModel,condition,ageOfDevice,collectionAddress}=req.body;
    if(!deviceType||!brandModel||!condition||!ageOfDevice||!collectionAddress||deviceType===''||brandModel===''||condition===''||ageOfDevice===''||collectionAddress===''){
        next(errorHandler(400,'All field are required'));
    }
    const newElectronics=new Electronics({
        ...req.body,
        userId: req.user.id,
    })
    try{
        const savedPost=await newElectronics.save();
        res.status(200).json(savedPost);
    }catch(error){
        next(error);
    }
}

export const createStationary=async(req,res,next)=>{
    const {itemType,quantity,condition,collectionAddress,additionalNotes}=req.body;
    if(!itemType||!quantity||!condition||!collectionAddress||!additionalNotes||itemType===''||quantity===''||condition===''||collectionAddress===''||additionalNotes===''){
        next(errorHandler(400,'All field are required'));
    }
    const newStationary=new Stationary({
        ...req.body,
        userId: req.user.id,
    })
    try{
        const savedPost=await newStationary.save();
        res.status(200).json(savedPost);
    }catch(error){
        next(error);
    }
}

export const createToys=async(req,res,next)=>{
    const {toyType,quantity,condition,collectionAddress,additionalNotes,ageOfToy}=req.body;
    if(!toyType||!quantity||!condition||!collectionAddress||!ageOfToy||toyType===''||quantity===''||condition===''||collectionAddress===''||ageOfToy===''){
        next(errorHandler(400,'All field are required'));
    }
    const newToy=new Toys({
        ...req.body,
        userId: req.user.id,
    })
    try{
        const savedPost=await newToy.save();
        res.status(200).json(savedPost);
    }catch(error){
        next(error);
    }
}

export const getUserDonations = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const [food, clothes, electronics, stationary, toys] = await Promise.all([
            Food.find({ userId }),
            Clothes.find({ userId }),
            Electronics.find({ userId }),
            Stationary.find({ userId }),
            Toys.find({ userId })
        ]);
        res.status(200).json({
            food,
            clothes,
            electronics,
            stationary,
            toys
        });
    } catch (error) {
        next(error);
    }
}