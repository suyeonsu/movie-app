import '../App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import MovieDetail from './views/MovieDetail/MovieDetail';

function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
          <Route path="/movie/:movieId" element = {<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
