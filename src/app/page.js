import Home from "./home_subpages/home.js"
import About from "./home_subpages/about.js"
import Navbar from "./components/navbar.js";


export default function Main() {
  return (

    <main className ="absolute inset-0">
      <Navbar></Navbar>
      <Home></Home>
      <About></About>
    </main>
  );
}
