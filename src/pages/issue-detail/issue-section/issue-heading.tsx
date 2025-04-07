import { Issue } from '@/__generated__/graphql';
import { Badge } from '@/components/ui/badge';
import { gql } from '@apollo/client';

interface IssueHeadingProps {
	number: Issue['number'];
	title: Issue['title'];
	state: Issue['state'];
}

const IssueHeading = ({ number, title, state }: IssueHeadingProps) => {
	return (
		<>
			<h1 className="mb-2 text-2xl font-bold">
				#{number} {title}
			</h1>
			<div className="mb-6 flex flex-wrap gap-3">
				<Badge
					className={
						{
							OPEN: 'bg-green-400',
							CLOSED: 'bg-purple-400',
						}[state]
					}
				>
					{state}
				</Badge>
			</div>
		</>
	);
};

IssueHeading.fragments = {
	issue: gql`
		fragment IssueHeading on Issue {
			number
			title
			state
		}
	`,
};

export default IssueHeading;
