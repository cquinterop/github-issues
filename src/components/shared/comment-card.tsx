import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MarkdownHighlight from '@/components/shared/markdown-highlight';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { IssueComment } from '@/__generated__/graphql';

type CommentCardProps<T> = {
	data: T;
};

const CommentCard = <T extends Partial<IssueComment>>({ data }: Readonly<CommentCardProps<T>>) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-3">
					<Link
						className="font-medium"
						target="_blank"
						to={data.author?.url as string}
					>
						<Avatar>
							<AvatarImage
								alt={data.author?.login}
								src={data.author?.avatarUrl}
							/>
							<AvatarFallback>{data.author?.login?.substring(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
					</Link>
					<div>
						<Link
							className="font-medium"
							target="_blank"
							to={data.author?.url as string}
						>
							<div className="font-medium">{data.author?.login || 'Anonymous'}</div>
						</Link>
						<div className="text-muted-foreground text-xs">{formatDistanceToNow(new Date(data.createdAt))} ago</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="prose prose-sm dark:prose-invert max-w-none">
					<MarkdownHighlight markdown={data.body as string} />
				</div>
			</CardContent>
		</Card>
	);
};

export default CommentCard;
