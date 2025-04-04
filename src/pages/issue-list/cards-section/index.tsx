import { gql, useSuspenseQuery } from '@apollo/client';
import IssueCard from '@/pages/issue-list/cards-section/issue-card';

const ISSUES_PER_PAGE = 2;

const CardsSection = () => {
	const { data } = useSuspenseQuery(CardsSection.query, {
		variables: {
			name: 'react',
			owner: 'facebook',
			query: 'is:issue archived:false repo:facebook/react sort:created-desc',
		},
	});
	const { edges, issueCount } = data;

	return (
		<div className="mt-8 space-y-6">
			<p className="text-muted-foreground text-sm">Found {issueCount} issues matching your criteria</p>

			<div className="space-y-4">
				{edges.map(({ node: issue }) => (
					<IssueCard
						issue={issue}
						key={issue.id}
					/>
				))}
			</div>
		</div>
	);
};

CardsSection.query = gql`
  query CardsSection($query: String!, $cursor: String) {
		search(
      query: $query
      type: ISSUE
      first: ${ISSUES_PER_PAGE}
      after: $cursor
    ) {
      issueCount
			edges {
        node {
					...IssueCard
				}
      }
    }
  }
	${IssueCard.fragments.item}
`;

export default CardsSection;
