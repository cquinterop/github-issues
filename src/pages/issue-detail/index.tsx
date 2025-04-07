import { gql, useSuspenseQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router';
import IssueDetailCard from '@/pages/issue-detail/issue-section/Issue-detail-card';
import IssueHeading from '@/pages/issue-detail/issue-section/issue-heading';
import { IssueDetailPageQuery, IssueDetailPageQueryVariables } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';
import Spinner from '@/components/shared/spinner';
import ErrorFallback from '@/components/shared/error-boundary';
import CommentSection from './comment-section';

const IssueDetailPage = () => {
	const { issueId } = useParams();
	const navigate = useNavigate();
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
	console.log(data);
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
				</div>
			</Suspense>
		</ErrorFallback>
	);
};

IssueDetailPage.query = gql`
	query IssueDetailPage($number: Int!) {
		repository(owner: "facebook", name: "react") {
			issue(number: $number) {
				id
				...IssueHeading
				...IssueDetailCard
				comments(first: 3) {
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
