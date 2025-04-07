import { gql } from '@apollo/client';
import { IssueCardFragment } from '@/__generated__/graphql';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, CircleDot, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

interface IssueCardProps {
	issue: IssueCardFragment;
}

const IssueCard = ({ issue }: Readonly<IssueCardProps>) => {
	return (
		<Card className="transition-all hover:shadow-md">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle className="flex items-center gap-2 text-lg">
						{issue.state === 'OPEN' ? <CircleDot className="stroke-green-600" /> : <CircleCheck className="stroke-purple-600" />}
						<Link
							className="hover:underline"
							to={`/issue/${issue.number}`}
						>
							{issue.title}
						</Link>
					</CardTitle>
				</div>
				<div className="mt-2 flex gap-2">
					{!!issue?.labels?.nodes?.length &&
						issue.labels.nodes.map((label) => (
							<Badge
								style={{
									color: `#${label?.color}`,
									borderColor: `#${label?.color}`,
									backgroundColor: `#${label?.color}33`,
								}}
								key={label?.id}
							>
								{label?.name}
							</Badge>
						))}
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-muted-foreground text-sm">
					<p className="line-clamp-3">{issue.bodyText}</p>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex w-full justify-between text-sm break-all">
					<div className="flex items-center gap-2">
						<Link
							className="font-medium"
							target="_blank"
							to={issue.author?.url}
						>
							<Avatar>
								<AvatarImage
									alt={issue.author?.login}
									src={issue.author?.avatarUrl}
								/>
								<AvatarFallback>{issue.author?.login?.substring(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						</Link>
						<span>
							Issue #{issue.number} ⸱ Opened {formatDistanceToNow(new Date(issue.createdAt))} ago by{' '}
							<Link
								className="underline"
								target="_blank"
								to={issue.author?.url}
							>
								{issue.author?.login || 'Anonymous'}
							</Link>
						</span>
					</div>
					<div className="flex items-center gap-1">
						<MessageSquare className="h-4 w-4" />
						<Link
							className="underline"
							to={`/issue/${issue.number}`}
						>
							{issue.comments.totalCount} comments
						</Link>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

IssueCard.fragments = {
	issue: gql`
		fragment IssueCard on Issue {
			id
			title
			number
			state
			bodyText
			createdAt
			comments {
				totalCount
			}
			author {
				avatarUrl(size: 40)
				login
				url
			}
			labels(first: 5) {
				nodes {
					id
					name
					color
				}
			}
		}
	`,
};

export default IssueCard;
