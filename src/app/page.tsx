import Home from "./home_subpages/home.js";
import About from "./home_subpages/about.js";
import Schedule from "./home_subpages/schedule.js";
import FAQ from "./home_subpages/faq.js";
import Sponsors from "./home_subpages/sponsors.js";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import AnalyticFrames from "./home_subpages/AnalyticFrames";
import MasterSiteBackground from "./components/master-site-background";

//updated main with ids for navbar, so links are fixed now
export default function Main() {
  return (
    <div className="relative isolate min-h-screen min-h-[100dvh] w-full">
      <MasterSiteBackground />
      <main className="relative z-[1] w-full">
        <Navbar />
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div>
          <AnalyticFrames />
        </div>
        <div id="schedule">
          <Schedule />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="sponsors">
          <Sponsors />
        </div>
        <Footer />
      </main>
    </div>
  );
}
