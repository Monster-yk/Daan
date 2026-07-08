import React, { useState } from 'react'
import {  Button, Label, TextInput,Spinner,Alert } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import {  useDispatch, useSelector } from 'react-redux';


export default function signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.password || !formData.email) {
      return dispatch(signInFailure('Please fill all the fields'));
      
    }
    try {


      dispatch(signInStart());


      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
     
      if (res.ok) {
        dispatch(signInSuccess(data.message));
        navigate('/home');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }



  return (
      <div className='min-h-screen mt-20'>
          <div className='flex p-3 max-w-3xl mx-auto flex-row gap-5'>
              {/* left */}
              <div className='flex-1'>
                  <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                      <div>
                      <Label value='Your Email' />
                      <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
                      </div>
                      <div>
                      <Label value='Your Password' />
                      <TextInput type='password' placeholder='*********' id='password' onChange={handleChange}/>
                      </div>
                      <Button className='bg-black' type='submit'>
                          continue
                    </Button>
                  </form>  
                  <div>
                      <span>Don't have account?</span>
                      <Link to='/signup' className='text-blue-600'>signup</Link>
                  </div>
                </div>

              {/* right */}
              <div className='flex-1'>
                  
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum distinctio id nesciunt numquam laborum sapiente at nostrum adipisci rerum beatae ullam quasi cum hic dicta optio labore sed corporis ipsum molestiae ipsa, quos praesentium totam minus. Veniam ipsum ratione, ipsa id saepe exercitationem placeat amet voluptatibus! Ex similique et fuga debitis in?</p>
                  
                </div>
          </div>
      
    </div>
  )
}
