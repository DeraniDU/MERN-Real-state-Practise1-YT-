import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Initiate Google Sign-In
      const result = await signInWithPopup(auth, provider);
      
      // Extract user information from Google
      const { displayName, email, photoURL } = result.user;

      // Send Google user data to your backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: displayName,
          email,
          photo: photoURL,
        }),
      });

      // Check if the response is successful
      if (!res.ok) {
        throw new Error('Failed to authenticate with server');
      }

      const data = await res.json();
      
      // Dispatch user data to Redux store
      dispatch(signInSuccess(data));

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Could not sign in with Google', error);
      // Optionally, show a user-friendly error message
      alert('An error occurred during Google sign-in. Please try again.');
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
