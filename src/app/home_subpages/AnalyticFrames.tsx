import Image from "next/image";

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
    <div className="bg-[#E8C48D] py-10 flex justify-center items-center flex-wrap gap-6 p-4">
      <Frame imgPath="/p-analyt-cropped.svg" eager />
      <Frame imgPath="/r-analyt-cropped.svg" />
      <Frame imgPath="/ps-analytF-cropped.svg" />
      <Frame imgPath="/ftH-analyt-cropped.svg" />
    </div>
  );
}
