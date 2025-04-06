import { gql } from '@apollo/client';
import { IssueComment, CommentDetailCardFragment } from '@/__generated__/graphql';
import CommentCard from '@/components/shared/comment-card';

interface CommentDetailCardProps {
	data: CommentDetailCardFragment;
}

const CommentDetailCard = ({ data }: Readonly<CommentDetailCardProps>) => {
	return <CommentCard data={data as Partial<IssueComment>} />;
};

CommentDetailCard.fragments = {
	issueComment: gql`
		fragment CommentDetailCard on IssueComment {
			id
			body
			createdAt
			author {
				avatarUrl(size: 40)
				login
				url
			}
		}
	`,
};

export default CommentDetailCard;
