import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function signup() {
    const [formData, setFromData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.id]: e.target.value.trim()
    });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email) {
      return setErrorMessage('email');
    }
    if (!formData.username ) {
      return setErrorMessage('username');
    }
    if ( !formData.password) {
      return setErrorMessage('password');
    }
    try {
      setLoading(true);
      setErrorMessage(null);


      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
                      <Label value='Your Username' />
                      <TextInput type='text' placeholder='Username' id='username'onChange={handleChange}/>
                      </div>
                      <div>
                      <Label value='Your Password' />
                      <TextInput type='password' placeholder='*********' id='password' onChange={handleChange}/>
                      </div>
                      <Button className='bg-black' type='submit' disabled={loading}>
                          {
                              loading ? (
                                  <>
                                      <Spinner size='sm'></Spinner>
                                      <span className='pl-3'>Loading...</span>
                                  </>
                              ):'Sign up'
                          }
                          
                    </Button>
                  </form>  
                  <div>
                      <span> Have account?</span>
                      <Link to='/signin' className='text-blue-600'>signin</Link>
                  </div>
                  {
                      errorMessage && (
                          <Alert className='mt-5' color='failure'>
                              {errorMessage}
                          </Alert>
                      )
                  }
                </div>

              {/* right */}
              <div className='flex-1'>
                  <img src="" alt="" />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum distinctio id nesciunt numquam laborum sapiente at nostrum adipisci rerum beatae ullam quasi cum hic dicta optio labore sed corporis ipsum molestiae ipsa, quos praesentium totam minus. Veniam ipsum ratione, ipsa id saepe exercitationem placeat amet voluptatibus! Ex similique et fuga debitis in?</p>
                  
                </div>
          </div>
      
    </div>
  )
}
