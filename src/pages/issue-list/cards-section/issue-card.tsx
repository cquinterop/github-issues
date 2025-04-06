import { gql } from '@apollo/client';
import { IssueCardFragment } from '@/__generated__/graphql';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, CircleDot, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useFilterIssue } from '@/hooks/useFilterIssue';

interface IssueCardProps {
	issue: IssueCardFragment;
}

function getHighlightedJSXSnippet(body: string, lookup: string, contextLength = 100): (string | JSX.Element)[] | null {
	if (!lookup) return body;

	const escaped = lookup.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const regex = new RegExp(escaped, 'gi');
	const match = body.match(regex);
	if (!match) return body;

	const first = body.search(regex);
	const start = Math.max(0, first - contextLength);
	const end = Math.min(body.length, first + lookup.length + contextLength);
	const snippet = body.slice(start, end);

	return snippet.split(regex).flatMap((part, i, arr) => (i < arr.length - 1 ? [part, <mark key={i}>{match[0]}</mark>] : [part]));
}

const IssueCard = ({ issue }: Readonly<IssueCardProps>) => {
	const { body, title } = useFilterIssue();

	return (
		<Card className="transition-all hover:shadow-md">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle className="flex items-center gap-2 text-lg">
						{issue.state === 'OPEN' ? <CircleDot className="stroke-green-600" /> : <CircleCheck className="stroke-purple-600" />}
						<Link
							className="hover:underline"
							to={`/issues/${issue.number}`}
						>
							{getHighlightedJSXSnippet(issue.title, title as string)}
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
					<p className="line-clamp-3">{getHighlightedJSXSnippet(issue.body, body as string)}</p>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex w-full justify-between text-sm">
					<div className="flex items-center gap-2">
						<Link
							className="font-medium"
							target="_blank"
							to={`https://github.com/${issue.author?.login}`}
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
								to={`https://github.com/${issue.author?.login}`}
							>
								{issue.author?.login || 'Anonymous'}
							</Link>
						</span>
					</div>
					<div className="flex items-center gap-1">
						<MessageSquare className="h-4 w-4" />
						<Link
							className="underline"
							to={`/issues/${issue.number}`}
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
	nodes: gql`
		fragment IssueCard on Issue {
			id
			title
			number
			state
			body
			createdAt
			comments {
				totalCount
			}
			author {
				avatarUrl(size: 32)
				login
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
