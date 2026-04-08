 
export const MASTER_SVG_FILENAME = "/master.svg";

type MasterSiteBackgroundProps = {
  src?: string;
};

export default function MasterSiteBackground({
  src = MASTER_SVG_FILENAME,
}: MasterSiteBackgroundProps) {
  return (
    <div
      className="site-master-bg-shell pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#E8C48D]"
      aria-hidden
    >
       <img
        src={src}
        alt=""
        className="master-svg"
        decoding="async"
      />
    </div>
  );
}
