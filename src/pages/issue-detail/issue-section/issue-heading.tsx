import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';

interface IssueHeadingProps {
	number: number;
	title: string;
	state: string;
	totalCount: number;
}

const IssueHeading = ({ number, title, state, totalCount }: IssueHeadingProps) => {
	return (
		<>
			<h1 className="mb-2 text-2xl font-bold">
				#{number} {title}
			</h1>
			<div className="mb-6 flex flex-wrap gap-3">
				<Badge
					className={
						{
							OPEN: 'bg-green-600',
							CLOSED: 'bg-gray-600',
						}[state]
					}
				>
					{state}
				</Badge>
				<div className="text-muted-foreground flex items-center gap-1 text-sm">
					<MessageSquare className="h-4 w-4" />
					<span>{totalCount} comments</span>
				</div>
			</div>
		</>
	);
};

export default IssueHeading;
