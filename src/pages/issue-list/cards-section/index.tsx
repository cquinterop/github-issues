import { gql, useSuspenseQuery } from '@apollo/client';
import IssueCard from '@/pages/issue-list/cards-section/issue-card';
import IssuePagination from '@/pages/issue-list/cards-section/issue-pagination';
import { usePagination } from '@/hooks/usePagination';
import { ISSUES_PER_PAGE } from '@/constants/issues';

const CardsSection = () => {
	const query = {
		is: 'issue',
		archived: 'false',
		repo: 'facebook/react',
		sort: 'created-desc',
	};
	// eslint-disable-next-line no-debugger
	debugger;
	const { startCursor: before, endCursor: after } = usePagination();
	const { data } = useSuspenseQuery(CardsSection.query, {
		variables: {
			query: Object.entries(query).reduce((acc, [key, value]) => `${key}:${value} ${acc}`, ''),
			after,
			before,
		},
	});
	const { nodes, issueCount, pageInfo } = data.search;

	return (
		<div className="mt-8 space-y-6">
			<p className="text-muted-foreground text-sm">Found {issueCount} issues matching your criteria</p>

			<div className="space-y-4">
				{nodes?.map((issue) => (
					<IssueCard
						issue={issue}
						key={issue?.id}
					/>
				))}
			</div>

			<IssuePagination pageInfo={pageInfo} />
		</div>
	);
};

CardsSection.query = gql`
  query CardsSection($query: String!, $after: String, $before: String) {
		search(
      query: $query
      type: ISSUE
      last: ${ISSUES_PER_PAGE}
      after: $after
			before: $before
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
	${IssueCard.fragments.nodes}
	${IssuePagination.fragments.pageInfo}
`;

export default CardsSection;
