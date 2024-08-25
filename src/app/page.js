import Home from "./home_subpages/home.js";
import About from "./home_subpages/about.js";
import Sponsors from "./home_subpages/sponsors.js";
import FAQ from "./home_subpages/faq.js";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";

//updated main with ids for navbar, so links are fixed now
export default function Main() {
  return (
    <main className="absolute inset-0">
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="sponsors">
        <Sponsors />
      </div>
      <Footer />
    </main>
  );
}
