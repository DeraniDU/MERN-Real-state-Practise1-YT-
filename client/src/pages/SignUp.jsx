import { useState } from 'react';
import { Link ,Navigate,useNavigate} from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false); // Ensure loading state is reset
    console.log(data);
    navigate('/sign-in');
  };

  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className="border p-3 rounded-lg" id='username' onChange={handleChange} />
        <input type="email" placeholder='Email' className="border p-3 rounded-lg" id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' className="border p-3 rounded-lg" id='password' onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>} {/* Display error message if there's any */}

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
