import Image from "next/image";
import Home from "./home_subpages/home.js"
import Navbar from "./components/navbar.js";

export default function Main() {
  return (

    <main className ="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Navbar></Navbar>
      <Home></Home>
    </main>
  );
}
