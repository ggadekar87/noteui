import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state: any) => state.home.pages);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_PAGE", payload: "home" });
  };

  return (
    <div className="home">
      <h1>Welcome to Home!</h1>
      <input type="text"></input>
      <button onClick={handleToggle}>Search</button>
    </div>
  );
};

export default Home;
