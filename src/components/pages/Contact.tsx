import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state: any) => state.home.pages);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_PAGE", payload: "contact" });
  };

  return (
    <div>
      <h1>Contact Us!</h1>
      <button onClick={handleToggle}>Toggle Contact</button>
    </div>
  );
};

export default Contact;
