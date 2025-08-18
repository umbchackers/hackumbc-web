//Component to check if the user is on a mobile device

'use client';
import { useEffect, useState } from 'react';

export default function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [breakpoint]);
	return isMobile;
}