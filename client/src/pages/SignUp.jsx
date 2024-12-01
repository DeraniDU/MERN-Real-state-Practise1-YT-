import { set } from 'mongoose'
import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

function SignUp() {
  const [formData, setFormData] = React.useState({})
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.type === 'radio') {
      setFormData({ ...formData, gender: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  // Handle form submit
  
  const handleSubmit =  async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
    const res = await fetch('/api/auth/signup',
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
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    console.log(data);
    setError(null);
    navigate('/sign-in');
    }catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
    
  }

  console.log(formData)
  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-10'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='Your Name'
          className='border p-3 rounded-lg ' id='name'onChange={handleChange} />

        <input type="email" placeholder='Your email'
          className='border p-3 rounded-lg ' id='email' onChange={handleChange}/>

        <input type="contact" placeholder='Your contact'
          className='border p-3 rounded-lg ' id='contact' onChange={handleChange}/>

        <div class="flex items-center gap-2" >
          <input type="radio" id="male" onChange={handleChange} name="gender" value="male" class="mr-2 text-blue-500"  />
            <label for="male" class="text-gray-700">Male</label>
       
          <input type="radio" id="female" onChange={handleChange} name="gender" value="female" class="mr-2 text-pink-500" />
            <label for="female" class="text-gray-700">Female</label>
        </div>

        <input type="text" placeholder='username'
          className='border p-3 rounded-lg ' id='username' onChange={handleChange}/>

        <input type="password" placeholder=' password'
          className='border p-3 rounded-lg ' id='password'onChange={handleChange} />

        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-70 disabled:opacity-50'>
        {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />

      </form>
      <div className='flex justify-center gap-2 mt-5'>
        <p>Already have an account? </p>
        <Link to= {"/sign-in"} >
          <span className='text-blue-500'>Sign In</span>
          </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  )
}

export default SignUp