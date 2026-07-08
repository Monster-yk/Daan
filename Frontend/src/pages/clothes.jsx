import { ShoppingBag } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {signInFailure,signInStart,signInSuccess} from '../redux/user/userSlice';
import { useState } from 'react';



export default function ClothesDonationPage() {
  const [formData, setFormData] = useState({
      typeOfClothing:'',
      quantity:'',
      size:'',
      condition:'',
      collectionAddress:'',
      additionalNote:'',

    });
    const dispatch = useDispatch();
    const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
        if(!formData.typeOfClothing||!formData.quantity||!formData.condition||!formData.additionalNote||!formData.size||!formData.collectionAddress){
          return dispatch(signInFailure('Please Fill all the fields'));
        }
        try{
          dispatch(signInStart());
          const res=await fetch('/api/donate/createClothes',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData),
          });
          const data=await res.json();
          if(data.success===false){
            dispatch(signInFailure(data.message));
          }
          if(res.ok){
            dispatch(signInSuccess(data.message));
            navigate('/')
          }
    
        }
        catch(error){
          dispatch(signInFailure(error.message))
        }
  }
  

 

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link 
        to="/donate"
        className="text-emerald-600 hover:text-emerald-700 inline-flex items-center mb-6"
      >
        ← Back to categories
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold">Donate Clothes</h1>
        </div>
        <form  className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="typeOfClothing" className="block text-sm font-medium mb-2">Type of Clothing</label>
            <input
              type="text"
              id="typeOfClothing"
              name="typeOfClothing"
              value={formData.typeOfClothing}
              onChange={handleChange}
              placeholder="e.g., Shirts, Pants, Dresses"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium mb-2">Size</label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g., S, M, L, XL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium mb-2">Condition</label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="e.g., New, Gently used"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Number of items"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="collectionAddress" className="block text-sm font-medium mb-2">Collection Address</label>
            <input
              type="text"
              id="collectionAddress"
              name="collectionAddress"
              value={formData.collectionAddress}
              onChange={handleChange}
              placeholder="Enter the address for clothes collection"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="additionalNote" className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              id="additionalNote"
              name="additionalNote"
              value={formData.additionalNote}
              onChange={handleChange}
              placeholder="Any specific details about the clothes"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Submit Clothes Donation
          </button>
        </form>
      </div>
    </div>
  )
}

