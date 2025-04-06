import { Github } from 'lucide-react';

const Header = () => {
	return (
		<header className="container mx-auto flex h-14 items-center justify-between border-b border-b-gray-200 px-6">
			<nav className="flex items-center gap-2 text-2xl font-bold">
				<Github /> Github Issues
			</nav>
		</header>
	);
};

export default Header;
