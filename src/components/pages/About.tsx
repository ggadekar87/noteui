import React from "react";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state: any) => state.home.pages);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_PAGE", payload: "about" });
  };

  return (
    <div>
      <h1>About Us!</h1>
      <button onClick={handleToggle}>Toggle About</button>
    </div>
  );
};

export default About;
