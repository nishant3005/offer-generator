import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/UI/Navbar/Navbar';
import Home from './components/UI/Landing Page/Home';
import OurFeatures from './components/UI/Our Features/OurFeatures';
import Resume from './components/UI/Forms/Resume/Resume';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Resume1 from './components/Templates/Resume/Resume1';
import Resume2 from './components/Templates/Resume/Resume2';
import OfferLetter from './components/UI/Forms/Offer Letter/OfferLetter';
import OfferLetter1 from './components/Templates/Offer Letter/OfferLetter1';
import Login from './components/UI/Login/Login';
import axios from 'axios';
import Profile from './components/UI/Profile/Profile';

function App() {
  const [user] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [resume, setResume] = useState(null);
  const [offerLetter, setOfferLetter] = useState(null);

  const getUser = async () => {
    try {
      await axios
        .get(
          `https://offer-generator-backend.onrender.com/offer_letter/history/${user.email}`
        )
        .then((response) => {
          setOfferLetter(response.data);
          console.log('data received!');
        })
        .catch((err) => {
          alert('error!');
        });

      await axios
        .get(
          `https://offer-generator-backend.onrender.com/resume/history/${user.email}`
        )
        .then((response) => {
          setResume(response.data);
          console.log('data received!');
        })
        .catch((err) => {
          alert('error!');
        });

      // setUser(data.user._json);
      // console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route
          exact
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/"
          element={
            <div>
              <Home />
              <OurFeatures />
            </div>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            user ? (
              <Profile
                resume={resume}
                offerLetter={offerLetter}
                email={user.email}
                setResume={setResume}
                setOfferLetter={setOfferLetter}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/resume/details"
          element={user ? <Resume /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/resume/templates/2"
          element={user ? <Resume2 /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/edit/resume/:id"
          element={user ? <Resume /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/offer_letter/details"
          element={user ? <OfferLetter /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/offer_letter/templates/1"
          element={user ? <OfferLetter1 /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/edit/offer_letter/:id"
          element={user ? <OfferLetter /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
