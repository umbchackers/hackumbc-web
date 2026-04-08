import Image from "next/image";

function Frame({ imgPath }: { imgPath: string }) {
  return (
    <Image
      width={250}
      height={100}
      alt="Analytic frame"
      src={imgPath}
      className=""
    />
  );
}

export default function AnalyticFrames() {
  return (
    <div className="bg-transparent py-10 flex justify-center items-center flex-wrap gap-6 p-4">
      <Frame imgPath="/p-analyt-cropped.svg" />
      <Frame imgPath="/r-analyt-cropped.svg" />
      <Frame imgPath="/ps-analytF-cropped.svg" />
      <Frame imgPath="/ftH-analyt-cropped.svg" />
    </div>
  );
}
