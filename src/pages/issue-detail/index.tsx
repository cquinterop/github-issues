import { gql, useSuspenseQuery } from '@apollo/client';
import { Link, useParams } from 'react-router';
import IssueDetailCard from '@/pages/issue-detail/issue-section/Issue-detail-card';
import CommentDetailCard from '@/pages/issue-detail/comment-section/comment-detail-card';
import IssueHeading from '@/pages/issue-detail/issue-section/issue-heading';
import { IssueDetailPageQuery, IssueDetailPageQueryVariables } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const IssueDetailPage = () => {
	const { issueId } = useParams();
	// eslint-disable-next-line no-debugger
	debugger;
	const { data } = useSuspenseQuery<IssueDetailPageQuery, IssueDetailPageQueryVariables>(IssueDetailPage.query, {
		variables: { number: Number(issueId) },
	});

	if (!data?.repository?.issue) {
		return (
			<div className="p-8 text-center">
				<h3 className="text-lg font-medium">Issue not found</h3>
				<p className="text-muted-foreground mt-2">The issue #{issueId} does not exist in the React repository</p>
			</div>
		);
	}

	const { issue } = data.repository;

	return (
		<div className="space-y-8">
			<Link to="/">
				<Button
					className="mx- mb-6 cursor-pointer"
					variant="link"
				>
					<ArrowLeft className="h-4 w-4" /> Back to issues
				</Button>
			</Link>

			<IssueHeading
				number={issue.number}
				state={issue.state}
				title={issue.title}
				totalCount={issue.comments.totalCount}
			/>

			<IssueDetailCard data={issue} />

			<h2 className="mb-4 text-xl font-semibold">Comments ({issue.comments.totalCount})</h2>
			{!!issue.comments.totalCount && (
				<div className="space-y-6">
					{issue.comments.nodes?.map(
						(comment) =>
							comment && (
								<CommentDetailCard
									data={comment}
									key={comment.id}
								/>
							)
					)}
				</div>
			)}
		</div>
	);
};

IssueDetailPage.query = gql`
	query IssueDetailPage($number: Int!) {
		repository(owner: "facebook", name: "react") {
			issue(number: $number) {
				id
				title
				state
				number
				...IssueDetailCard
				comments(first: 5) {
					totalCount
					nodes {
						...CommentDetailCard
					}
				}
			}
		}
	}
	${IssueDetailCard.fragments.issue}
	${CommentDetailCard.fragments.issueComment}
`;

export default IssueDetailPage;
