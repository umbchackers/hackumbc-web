import Home from "./home_subpages/home.js"
import About from "./home_subpages/about.js"
import Sponsors from "./home_subpages/sponsors.js";
import Navbar from "./components/navbar.js";

//added sponsors section

export default function Main() {
  return (

    <main className ="absolute inset-0">
      <Navbar></Navbar>
      <Home></Home>
      <About></About>
      <Sponsors></Sponsors>
    </main>
  );
}
