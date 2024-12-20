import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import { ErrorBoundary } from "./components/hoc/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import Content from "./components/content/content";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/pages/Login/Login";
import { isUserLoggedIn } from "./components/store/reducer/notereducers";
import SignUp from "./components/pages/SignUp/SignUp";
import IndexPage from "./components/pages/IndexPage/IndexPage";
import Account from "./components/pages/Account/Account";
import Public from "./components/pages/Public/Public";
const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated: boolean = useSelector(
    (state: any) => state.home.isAuthenticated
  );
  useEffect(() => {
    dispatch(isUserLoggedIn(""));
  }, []);
  let routes = (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/indexpage" element={<IndexPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/public/:id" element={<Public />} />
    </Routes>
  );
  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/content/:id" element={<Content />} />
        <Route path="/public/:id" element={<Public />} />
      </Routes>
    );
  }

  return (
    <ErrorBoundary>
      <Layout isAuthenticated={isAuthenticated}>{routes}</Layout>
    </ErrorBoundary>
  );
};

export default App;
