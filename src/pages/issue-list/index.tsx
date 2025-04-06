import ErrorFallback from '@/components/shared/error-boundary';
import CardsSection from '@/pages/issue-list/cards-section';
import FilterSection from '@/pages/issue-list/filter-section';

const IssueListPage = () => {
	return (
		<>
			<h1 className="mb-8 text-3xl font-bold">React Repository Issues</h1>
			<FilterSection />
			<ErrorFallback>
				<CardsSection />
			</ErrorFallback>
		</>
	);
};

export default IssueListPage;
