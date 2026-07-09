import Image from "next/image";
import SectionTitle from "../components/title";

function Frame({ imgPath, eager = false }: { imgPath: string; eager?: boolean }) {
  return (
    <Image
      width={6648}
      height={5630}
      alt="Analytic frame"
      src={imgPath}
      loading={eager ? "eager" : "lazy"}
      style={{ width: "250px", height: "auto" }}
      className=""
    />
  );
}

export default function AnalyticFrames() {
  return (
    <section className="bg-transparent py-10 px-4">
      <div className="flex flex-col items-center text-center mb-8">
        <SectionTitle title="LAST YEAR'S STATS" />
        <p className="text-black text-lg font-medium mt-3 max-w-xl">
          Highlights from hackUMBC 2025
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-6">
        <Frame imgPath="/p-analyt-cropped.svg" />
        <Frame imgPath="/r-analyt-cropped.svg" />
        <Frame imgPath="/ps-analytF-cropped.svg" />
        <Frame imgPath="/ftH-analyt-cropped.svg" />
      </div>
    </section>
  );
}
