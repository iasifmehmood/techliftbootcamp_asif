import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import NoPage from "./components/pages/NoPage";
import "./App.css";
import About from "./components/pages/About";
import AddTollData from "./components/toll_data/AddTollData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="/users/addData" element={<AddTollData />}></Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
