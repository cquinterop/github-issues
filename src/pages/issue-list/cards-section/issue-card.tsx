import { gql } from '@apollo/client';
import { IssueCardFragment } from '@/__generated__/graphql';
import { AvatarWithFallback } from '@/components/ui/avatar-with-fallback';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';

interface IssueCardProps {
	issue: IssueCardFragment;
}

const IssueCard = ({ issue }: Readonly<IssueCardProps>) => {
	return (
		<Card className="transition-all hover:shadow-md">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle className="text-lg">
						<Link
							className="hover:underline"
							to={`/issues/${issue.number}`}
						>
							#{issue.number} {issue.title}
						</Link>
					</CardTitle>
					<Badge variant={issue.state === 'OPEN' ? 'default' : 'secondary'}>{issue.state}</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-muted-foreground flex items-center gap-4 text-sm">
					<div className="flex items-center gap-1">
						<Clock className="h-4 w-4" />
						<span>Opened {formatDistanceToNow(new Date(issue.createdAt))} ago</span>
					</div>
					<div className="flex items-center gap-1">
						<MessageSquare className="h-4 w-4" />
						<span>{issue.comments.totalCount} comments</span>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex items-center gap-2 text-sm">
					<AvatarWithFallback
						alt={issue.author?.login as string}
						fallback={issue.author?.login?.match(/\b\w/g)?.join('').slice(0, 2) ?? ''}
						src={issue.author?.avatarUrl}
					/>
					<span>
						Created by <span className="font-medium">{issue.author?.login || 'Anonymous'}</span>
					</span>
				</div>
			</CardFooter>
		</Card>
	);
};

IssueCard.fragments = {
	item: gql`
		fragment IssueCard on Issue {
			id
			number
			title
			state
			createdAt
			comments {
				totalCount
			}
			author {
				login
				avatarUrl
			}
		}
	`,
};

export default IssueCard;
