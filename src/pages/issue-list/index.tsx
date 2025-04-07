import ErrorFallback from '@/components/shared/error-boundary';
import Spinner from '@/components/shared/spinner';
import CardsSection from '@/pages/issue-list/cards-section';
import FilterSection from '@/pages/issue-list/filter-section';
import { Suspense } from 'react';

const IssueListPage = () => {
	return (
		<>
			<h1 className="mb-8 text-3xl font-bold">React Repository Issues</h1>
			<FilterSection />
			<ErrorFallback>
				<Suspense fallback={<Spinner />}>
					<CardsSection />
				</Suspense>
			</ErrorFallback>
		</>
	);
};

export default IssueListPage;
