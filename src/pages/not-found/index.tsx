import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="w-full space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold sm:text-5xl">404</h1>
					<p className="text-gray-500">Nothing to see here.</p>
				</div>
				<Button
					className="cursor-pointer"
					onClick={() => navigate(-1)}
				>
					Return
				</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;
