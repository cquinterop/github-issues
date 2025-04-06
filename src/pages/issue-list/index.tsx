import ErrorFallback from '@/components/shared/error-boundary';
import CardsSection from '@/pages/issue-list/cards-section';

const IssueListPage = () => {
	return (
		<ErrorFallback>
			<CardsSection />
		</ErrorFallback>
	);
};

export default IssueListPage;
