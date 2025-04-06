import { gql } from '@apollo/client';
import { IssueComment, IssueDetailCardFragment } from '@/__generated__/graphql';
import CommentCard from '@/components/shared/comment-card';

interface IssueDetailCardProps {
	data: IssueDetailCardFragment;
}

const IssueDetailCard = ({ data }: Readonly<IssueDetailCardProps>) => {
	return <CommentCard data={data as Partial<IssueComment>} />;
};

IssueDetailCard.fragments = {
	issue: gql`
		fragment IssueDetailCard on Issue {
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

export default IssueDetailCard;
