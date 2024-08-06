import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";  
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

import SignUp from "./pages/SignUp";
import Header from "./components/Header";

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/signIn" element={<SignIn />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/signUp" element={<SignUp />} />
  </Routes>
  </BrowserRouter>;
}