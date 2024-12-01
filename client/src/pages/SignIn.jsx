import { set } from 'mongoose'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

function Signin() {
  const [formData, setFormData] = React.useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.type === 'radio') {
      setFormData({ ...formData, gender: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  // Handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(signInSuccess(error.message));
    }

  }

  console.log(formData)
  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-10'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='username'
          className='border p-3 rounded-lg ' id='username' onChange={handleChange} />

        <input type="password" placeholder=' password'
          className='border p-3 rounded-lg ' id='password' onChange={handleChange} />

        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-70 disabled:opacity-50'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />

      </form>
      <div className='flex justify-center gap-2 mt-5'>
        <p>Don t have an account? </p>
        <Link to={"/sign-up"} >
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  )
}

export default Signin