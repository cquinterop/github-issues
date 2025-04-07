import { gql, useSuspenseQuery } from '@apollo/client';
import IssueCard from '@/pages/issue-list/cards-section/issue-card';
import IssuePagination from '@/pages/issue-list/cards-section/issue-pagination';
import { usePagination } from '@/hooks/usePagination';
import { ISSUES_PER_PAGE } from '@/constants/issues';
import { useFilterIssue } from '@/hooks/useFilterIssue';
import EmptyState from '@/components/shared/empty-state';
import { useMemo } from 'react';
import { IssueCardFragment } from '@/__generated__/graphql';

const CardsSection = () => {
	const { query } = useFilterIssue();
	const { startCursor, endCursor, page } = usePagination();
	const { data } = useSuspenseQuery(CardsSection.query, {
		variables: {
			query,
			endCursor,
			startCursor,
			page,
		},
	});

	const { nodes, issueCount, pageInfo } = data.search;
	const totalPages = useMemo(() => Math.ceil(issueCount / ISSUES_PER_PAGE), []);

	if (!nodes.length) {
		return <EmptyState />;
	}

	return (
		<div className="mt-8 space-y-6">
			<p className="text-muted-foreground text-sm">Found {issueCount} issues matching your criteria</p>

			<div className="space-y-4">
				{nodes?.map((issue: IssueCardFragment) => (
					<IssueCard
						issue={issue}
						key={issue?.id}
					/>
				))}
			</div>

			<IssuePagination
				pageInfo={pageInfo}
				totalPages={totalPages}
			/>
		</div>
	);
};

CardsSection.query = gql`
  query CardsSection($query: String!, $endCursor: String, $startCursor: String) {
		search(
      query: $query
      type: ISSUE
      last: ${ISSUES_PER_PAGE}
      after: $endCursor
			before: $startCursor
    ) {
      issueCount
			nodes {
      	...IssueCard
    	}
			pageInfo {
        ...IssuePagination
      }
    }
  }
	${IssueCard.fragments.issue}
	${IssuePagination.fragments.pageInfo}
`;

export default CardsSection;
