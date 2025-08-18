// Component to tile an SVG image on a mobile device
// Renders a top (non-repeating) SVG sized by its aspect ratio, then
// repeats a second SVG vertically to seamlessly continue the design.

'use client';

export default function MobileSvgTiler({ show, topSrc, tileSrc, aspectRatio = 1.5 }) {
	if (!show) return null;
	
	// Height of the first (top) SVG in viewport units: 100vw / aspectRatio
	// Example: for a 1440x960 SVG → aspectRatio = 1.5 → firstHeight = calc(100vw / 1.5)
	const firstHeight = `calc(100vw / ${aspectRatio})`;
	
	return (
		<div style={{
			position: 'absolute', 
            inset: 0, 
            pointerEvents: 'none', 
            zIndex: 1, 
            overflow: 'hidden',
		}}>
			{/* Top, non-repeating SVG header */}
			<img src={topSrc} alt="" style={{
				position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto',
				aspectRatio: `${aspectRatio}`
			}} />
			
			{/* Tiled continuation: repeats vertically to fill the remainder below the first SVG */}
			<div aria-hidden="true" style={{
				position: 'absolute', left: 0, width: '100%',
				top: firstHeight, height: `calc(100% - ${firstHeight})`,
				background: `url('${tileSrc || topSrc}') top center / 100% auto repeat-y`
			}} />
		</div>
	);
}