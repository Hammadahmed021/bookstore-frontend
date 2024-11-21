import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";




export default function App() {
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}