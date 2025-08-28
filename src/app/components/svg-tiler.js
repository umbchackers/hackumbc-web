// Unified SVG tiler component for both mobile and desktop
// Renders a top (non-repeating) SVG sized by its aspect ratio, then
// repeats a second SVG vertically to seamlessly continue the design.

'use client';
import { useEffect, useRef, useState } from 'react';

export default function SvgTiler({ 
	show, 
	topSrc, 
	tileSrc, 
	aspectRatio = 1.5, 
	isMobile = false,
	maxWidth = null,
	className = ''
}) {
	if (!show) return null;

	const wrapperRef = useRef(null);
	const [firstHeightPx, setFirstHeightPx] = useState(0);

	useEffect(() => {
		// Only run desktop calculations when not mobile
		if (isMobile) {
			setFirstHeightPx(0); // Reset height when switching to mobile
			return;
		}
		
		if (!wrapperRef.current) return;
		let raf = 0;
		const update = () => {
			if (!wrapperRef.current) return;
			const w = wrapperRef.current.clientWidth || 0;
			setFirstHeightPx(w > 0 ? w / aspectRatio : 0);
		};
		update();
		const ro = new ResizeObserver(() => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(update);
		});
		ro.observe(wrapperRef.current);
		return () => {
			ro.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [aspectRatio, isMobile]); 

	// Mobile version: use viewport units and simpler layout
	if (isMobile) {
		const firstHeight = `calc(100vw / ${aspectRatio})`;
		
		return (
			<div
				className={className}
				style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					zIndex: 1,
					overflow: 'hidden',
					width: '100%',
					left: 0,
					transform: 'none'
				}}
			>
				{/* Top, non-repeating SVG header */}
				<img
					src={topSrc}
					alt=""
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: 'auto',
						aspectRatio: `${aspectRatio}`,
						display: 'block'
					}}
				/>

				{/* Tiled continuation: repeats vertically to fill the remainder */}
				<div
					aria-hidden="true"
					style={{
						position: 'absolute',
						left: 0,
						width: '100%',
						top: firstHeight,
						height: `calc(100% - ${firstHeight})`,
						background: `url('${tileSrc || topSrc}') top center / 100% auto repeat-y`
					}}
				/>
			</div>
		);
	}

	// Desktop version: use pixel-based calculations and support maxWidth
	return (
		<div
			ref={wrapperRef}
			className={className}
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 1,
				overflow: 'hidden',
				// Desktop: respect container max-width without centering transform
				...(maxWidth && {
					maxWidth: maxWidth,
					left: 0,
					transform: 'none',
					width: '100%'
				})
			}}
		>
			{/* Top, non-repeating SVG header */}
			<img
				src={topSrc}
				alt=""
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: `${firstHeightPx}px`,
					display: 'block',
					objectFit: 'cover',
					objectPosition: 'left top'
				}}
			/>

			{/* Tiled continuation: background is phase-aligned to the top slice */}
			<div
				aria-hidden="true"
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: `${firstHeightPx}px`,
					bottom: 0,
					backgroundImage: `url('${tileSrc || topSrc}')`,
					backgroundRepeat: 'repeat-y',
					backgroundSize: '100% auto',
					backgroundPosition: `left -${firstHeightPx}px`,
					backgroundAttachment: 'local'
				}}
			/>
		</div>
	);
}