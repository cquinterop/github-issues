import { IssueComment, CommentDetailCardFragment } from '@/__generated__/graphql';
import CommentCard from '@/components/shared/comment-card';

interface CommentDetailCardProps {
	data: CommentDetailCardFragment;
}

const CommentDetailCard = ({ data }: Readonly<CommentDetailCardProps>) => {
	return <CommentCard data={data as Partial<IssueComment>} />;
};

export default CommentDetailCard;
