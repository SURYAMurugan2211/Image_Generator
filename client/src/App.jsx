import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Final_logo} from "./assets"; 
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center  sm:px-0 px-2 py-1 border-b border-b-[#e6ebf7] ">
        <Link to="/">
          <img src={Final_logo} alt="logo" className="w-26 object-contain rounded-full" />
        </Link>
        <Link to="/create-post" className="font-inter front-medium
         bg-[#6f4dab] text-white px-4 py-2 rounded-md">Create</Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fae]
       min-h-[calc (100vh-73px)] ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
