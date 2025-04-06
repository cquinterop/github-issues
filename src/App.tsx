import { createBrowserRouter, RouterProvider } from 'react-router';
import IssueListPage from '@/pages/issue-list';
import DataProvider from '@/providers/data-provider';
import LayoutPage from '@/components/layout';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

const router = createBrowserRouter([
	{
		path: '/',
		element: <IssueListPage />,
	},
]);

function App() {
	return (
		<NuqsAdapter>
			<DataProvider>
				<LayoutPage>
					<RouterProvider router={router} />;
				</LayoutPage>
			</DataProvider>
		</NuqsAdapter>
	);
}

export default App;
