import Image from "next/image";
import "../css/home.css";
import LinkBox from "../components/links";

export default function Home() {
  return (
      <>

      <div className="home-container">
        <Image
          className="hack-logo dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:invert"
          src="/hackText24.png"
          alt="hackUMBC Logo"
          width={480}
          height={480}
          priority
        />
        <p className="text-height text-white text-2xl mt-8 font-semibold"> 10th</p>
        <LinkBox href="https://www.hackumbc.tech/" color={false}> offsite={true}</LinkBox>

        <div className="footer">
          <LinkBox href="https://www.hackumbc.tech/" desc="Sign up and join us for the 10th anniversary @ hackUMBC!" title="Registration"> offsite={true}</LinkBox>
          <LinkBox href="mailto:sponsorship@hackumbc.tech" desc="Curious about sponsorship? Click here or email us sponsor@hackumbc.tech" title="Sponsorship"></LinkBox>
        </div>

      </div>
      </>
  );
}
