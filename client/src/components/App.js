import '../App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import MovieDetail from './views/MovieDetail/MovieDetail';
import FavoritePage from './views/FavoritePage/FavoritePage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>

        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
          <Route path="/movie/:movieId" element = {<MovieDetail />} />
          <Route path="/favorite" element = {<FavoritePage />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
