import { gql, useSuspenseQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router';
import IssueDetailCard from '@/pages/issue-detail/issue-section/Issue-detail-card';
import IssueHeading from '@/pages/issue-detail/issue-section/issue-heading';
import { IssueDetailPageQuery, IssueDetailPageQueryVariables } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Suspense, useCallback } from 'react';
import Spinner from '@/components/shared/spinner';
import ErrorFallback from '@/components/shared/error-boundary';
import CommentSection from './comment-section';
import InfiniteScroll from '@/components/shared/infinite-scroll';
import EmptyState from '@/components/shared/empty-state';

const IssueDetailPage = () => {
	const { issueId } = useParams();
	const navigate = useNavigate();
	// eslint-disable-next-line no-debugger
	debugger;
	const { data, fetchMore } = useSuspenseQuery<IssueDetailPageQuery, IssueDetailPageQueryVariables>(IssueDetailPage.query, {
		variables: { number: Number(issueId), after: null },
	});

	const handleInfiniteScroll = useCallback(() => {
		fetchMore({
			variables: { number: Number(issueId), after: data.repository.issue.comments.pageInfo.endCursor },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					repository: {
						...prev.repository,
						issue: {
							...prev.repository?.issue,
							comments: {
								...prev.repository.issue.comments,
								nodes: [...prev.repository.issue.comments.nodes, ...fetchMoreResult.repository.issue.comments.nodes],
								pageInfo: {
									...fetchMoreResult.repository.issue.comments.pageInfo,
								},
							},
						},
					},
				};
			},
		});
	}, [data, fetchMore, issueId]);

	if (!data?.repository?.issue) {
		return <EmptyState />;
	}

	const { issue } = data.repository;

	return (
		<ErrorFallback>
			<Suspense fallback={<Spinner />}>
				<div className="space-y-8">
					<Button
						className="mx- mb-6 cursor-pointer"
						variant="link"
						onClick={() => navigate(-1)}
					>
						<ArrowLeft className="h-4 w-4" /> Back to issues
					</Button>
					<IssueHeading
						number={issue.number}
						state={issue.state}
						title={issue.title}
					/>
					<IssueDetailCard
						data={{
							body: issue.body,
							createdAt: issue.createdAt,
							author: issue.author,
						}}
					/>
					<CommentSection comments={issue?.comments} />
					<InfiniteScroll
						hasMore={issue?.comments.pageInfo.hasNextPage}
						onLoadMore={() => handleInfiniteScroll()}
					/>
				</div>
			</Suspense>
		</ErrorFallback>
	);
};

IssueDetailPage.query = gql`
	query IssueDetailPage($number: Int!, $after: String) {
		repository(owner: "facebook", name: "react") {
			issue(number: $number) {
				id
				...IssueHeading
				...IssueDetailCard
				comments(first: 3, after: $after) {
					...CommentSection
				}
			}
		}
	}
	${IssueHeading.fragments.issue}
	${IssueDetailCard.fragments.issue}
	${CommentSection.fragments.issueCommentConnection}
`;

export default IssueDetailPage;
