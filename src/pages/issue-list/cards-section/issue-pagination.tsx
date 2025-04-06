import { IssuePaginationFragment } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import { gql } from '@apollo/client';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface IssuePaginationProps {
	pageInfo: IssuePaginationFragment;
	totalPages: number;
}

const IssuePagination = ({ pageInfo, totalPages }: Readonly<IssuePaginationProps>) => {
	const { hasPreviousPage, hasNextPage, startCursor, endCursor } = pageInfo;
	const { page, handlePreviousPage, handleNextPage } = usePagination();

	return (
		<div className="flex items-center justify-between pt-4">
			<Button
				className="cursor-pointer"
				disabled={!hasPreviousPage}
				variant="outline"
				onClick={() => handlePreviousPage(page - 1, startCursor as string)}
			>
				<ArrowLeft /> Previous
			</Button>
			<span className="text-muted-foreground text-sm">
				Page {page} of {totalPages}
			</span>
			<Button
				className="cursor-pointer"
				disabled={!hasNextPage}
				variant="outline"
				onClick={() => handleNextPage(page + 1, endCursor as string)}
			>
				Next <ArrowRight />
			</Button>
		</div>
	);
};

IssuePagination.fragments = {
	pageInfo: gql`
		fragment IssuePagination on PageInfo {
			hasPreviousPage
			hasNextPage
			startCursor
			endCursor
		}
	`,
};

export default IssuePagination;
