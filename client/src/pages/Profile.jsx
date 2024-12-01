import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../firebase"
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,

} from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { set } from "mongoose"



function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // Upload file to firebase storage

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({
            ...formData,
            avatar: downloadURL
          })
        );
      }
    );
  };

  // Handle form data

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // Handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  // Handle delete user

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  // Handle sign out

  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));

    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  // Handle show listings

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      console.log(data);

    } catch (error) {
      setShowListingsError(true);
    }

  }

  // Handle delete listing

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          className='hidden'
          ref={fileRef}
          accept="image/*"
        />
        {/* rules_version = '2';
          *
          *         // Craft rules based on data in your Firestore database
          *          // allow write: if firestore.get(
          *          //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
          *          service firebase.storage {
          *            match / b / { bucket } / o {
          *            match / { allPaths=**} {
          *            allow read;
          *          allow write : if
          *          request.resource.size < 2 * 1024 * 1024 &&
          *          request.resource.contentType.matches('image/.*')
          *        
          *      }
          *    }}
          */}
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer  self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder='Name'
          defaultValue={currentUser.name}
          className='bg-slate-100 p-3 rounded-lg my-2'
          id="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Email'
          defaultValue={currentUser.email}
          className='bg-slate-100 p-3 rounded-lg my-2'
          id="email"
          onChange={handleChange}
        />
        <input
          type="contact"
          placeholder='contact'
          defaultValue={currentUser.contact}
          className='bg-slate-100 p-3 rounded-lg my-2'
          id="contact"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder='username'
          defaultValue={currentUser.username}
          className='bg-slate-100 p-3 rounded-lg my-2'
          id="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          className='bg-slate-100 p-3 rounded-lg my-2'
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg my-2 uppercase hover:opacity-45 disabled:opacity-30'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer"
        >
          Sing out
        </span>
      </div>
        <Link
          to={"/create-listing"}
          className='bg-green-700 text-white p-3 rounded-lg my-2 uppercase hover:opacity-45 disabled:opacity-30 text-center'

        >
          Create Listing
        </Link>
      </form>
      
      <p className="text-green-700 text-center mt-5">{updateSuccess ? 'Profile updated successfully' : ''}</p>
      <p className="text-red-700 text-center mt-5">{error ? error : ''}</p>
      <button
        onClick={handleShowListings}
        className="w-full bg-green-700 text-white p-3 rounded-lg my-2 uppercase hover:opacity-45 disabled:opacity-30">
        <Link to="/listings">
          View Listings
        </Link>
      </button>
      <p className="text-red-700 text-center mt-5">{showListingsError ? 'Error fetching listings' : ''}</p>
      <div className="flex flex-col gap-4">
      {/* <h1 className="text-3xl font-semibold text-center my-7">Your Listings</h1> */}
        {userListings && userListings.length > 0 &&          
          userListings.map((listing) => (
            
            <div key={listing._id} className="bg-slate-100 p-3 rounded-lg my-2 gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt={listing.title} className="w-full h-40 object-cover" />
              </Link>
              <Link to={`/listing/${listing._id}`}>
                <p className="text-slate-700 font-semibold">{listing.title}</p>
              </Link>
              <p className="text-slate-700 font-semibold">Pr:{listing.regularPrice}</p>
              <p className="text-slate-700 font-semibold">{listing.location}</p>

              <div className="flex justify-between">
                <Link to={`/update-listing/${listing._id}`} >
                <button  className="text-green-700">Edit</button >
                </Link>
                <button  onClick={()=> handleListingDelete(listing._id)} className="text-red-700">Delete</button>
              </div>
            </div>
          ))}

      </div>


    </div>
  )
}

export default Profile