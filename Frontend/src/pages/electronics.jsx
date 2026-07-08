
import { Laptop } from 'lucide-react'
// import {Link} from 'react-router-dom'
// import { ShoppingBag } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signInFailure,signInStart,signInSuccess} from '../redux/user/userSlice';
import { useState } from 'react';

export default function ElectronicsDonationPage() {
  const [formData, setFormData] = useState({
    deviceType:'',
    brandModel:'',
    ageOfDevice:'',
    condition:'',
    collectionAddress:'',
    additionalNotes:'',

  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
// console.log(formData);
  const handleSubmit=async(e)=>{
    e.preventDefault();
        if(!formData.deviceType||!formData.brandModel||!formData.condition||!formData.ageOfDevice||!formData.collectionAddress){
          return dispatch(signInFailure('Please Fill all the fields'));
        }
        try{
          dispatch(signInStart());
          const res=await fetch('/api/donate/createElectronics',{
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
          <Laptop className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold">Donate Electronics</h1>
        </div>
        <form  className="space-y-4" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="deviceType" className="block text-sm font-medium mb-2">Device Type</label>
            <input
              type="text"
              id="deviceType"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              placeholder="e.g., Laptop, Phone, Tablet"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="brandModel" className="block text-sm font-medium mb-2">Brand & Model</label>
            <input
              type="text"
              id="brandModel"
              name="brandModel"
              value={formData.brandModel}
              onChange={handleChange}
              placeholder="e.g., Apple MacBook Pro 2019"
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
              placeholder="e.g., Working, Needs repair"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="ageOfDevice" className="block text-sm font-medium mb-2">Age of Device</label>
            <input
              type="text"
              id="ageOfDevice"
              name="ageOfDevice"
              value={formData.ageOfDevice}
              onChange={handleChange}
              placeholder="e.g., 2 years"
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
              placeholder="Enter the address for electronics collection"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any specific details about the device"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Submit Electronics Donation
          </button>
        </form>
      </div>
    </div>
  )
}

