export const MASTER_SVG_FILENAME = '/master.svg';
export const MOBILE_MASTER_SVG_FILENAME = '/mobile_master.svg';

type MasterSiteBackgroundProps = {
  src?: string;
};

export default function MasterSiteBackground({
  src,
}: MasterSiteBackgroundProps) {
  return (
    <div
      className="site-master-bg-shell pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#E8C48D]"
      aria-hidden
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="master-svg"
          decoding="async"
        />
      ) : (
        <>
          <img
            src={MASTER_SVG_FILENAME}
            alt=""
            className="master-svg hidden md:block"
            decoding="async"
          />
          <img
            src={MOBILE_MASTER_SVG_FILENAME}
            alt=""
            className="master-svg block md:hidden"
            decoding="async"
          />
        </>
      )}
    </div>
  );
}
