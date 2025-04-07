import { IssueComment } from '@/__generated__/graphql';
import CommentCard from '@/components/shared/comment-card';

interface CommentDetailCardProps {
	data: Partial<IssueComment>;
}

const CommentDetailCard = ({ data }: Readonly<CommentDetailCardProps>) => {
	return <CommentCard data={data} />;
};

export default CommentDetailCard;
