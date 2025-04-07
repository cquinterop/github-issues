import { gql } from '@apollo/client';
import CommentDetailCard from './comment-detail-card';

const CommentSection = ({ comments }) => {
	return (
		<>
			<h2 className="mb-4 text-xl font-semibold">Comments ({comments.totalCount})</h2>
			{!!comments?.totalCount && (
				<div className="space-y-6">
					{comments.nodes?.map(
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
		</>
	);
};

CommentSection.fragments = {
	issueCommentConnection: gql`
		fragment CommentSection on IssueCommentConnection {
			totalCount
			nodes {
				id
				body
				createdAt
				author {
					avatarUrl(size: 40)
					login
					url
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	`,
};

export default CommentSection;
