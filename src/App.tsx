import { createBrowserRouter, RouterProvider } from 'react-router';
import IssueListPage from '@/pages/issue-list';
import DataProvider from '@/providers/data-provider';
import LayoutPage from '@/components/layout';
import IssueDetailPage from './pages/issue-detail';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

const router = createBrowserRouter([
	{
		path: '/',
		element: <IssueListPage />,
	},
	{
		path: '/issue/:issueId',
		element: <IssueDetailPage />,
	},
]);

function App() {
	return (
		<NuqsAdapter>
			<DataProvider>
				<LayoutPage>
					<RouterProvider router={router} />
				</LayoutPage>
			</DataProvider>
		</NuqsAdapter>
	);
}

export default App;
