import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback } from 'react';

export const usePagination = () => {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [startCursor, setStartCursor] = useQueryState('startCursor');
	const [endCursor, setEndCursor] = useQueryState('endCursor');

	const handlePreviousPage = useCallback(
		(page: number, cursor: string) => {
			setPage(page);
			setStartCursor(cursor);
			setEndCursor(null);
		},
		[setPage, setStartCursor, setEndCursor]
	);

	const handleNextPage = useCallback(
		(page: number, cursor: string) => {
			setPage(page);
			setStartCursor(null);
			setEndCursor(cursor);
		},
		[setPage, setStartCursor, setEndCursor]
	);

	return {
		page,
		startCursor,
		endCursor,
		handlePreviousPage,
		handleNextPage,
	};
};
