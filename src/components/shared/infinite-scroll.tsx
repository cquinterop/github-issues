import { useEffect, useRef } from 'react';

type InfiniteScrollTriggerProps = {
	onLoadMore: () => void;
	hasMore: boolean;
};

const InfiniteScroll = ({ onLoadMore, hasMore }: InfiniteScrollTriggerProps) => {
	const triggerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!hasMore || !triggerRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onLoadMore();
				}
			},
			{ rootMargin: '100px' }
		);

		observer.observe(triggerRef.current);

		return () => {
			observer.disconnect();
		};
	}, [hasMore, onLoadMore]);

	return (
		<div
			className="h-1"
			ref={triggerRef}
		/>
	);
};

export default InfiniteScroll;
