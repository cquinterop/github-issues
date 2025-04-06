import { Link } from 'react-router';

const Header = () => {
	return (
		<header className="container mx-auto flex h-14 justify-between border-b border-b-gray-200 px-6">
			<nav className="flex items-center gap-6">
				{/* 				<Link
					className="font-fira text-2xl font-bold text-[#ff355e]"
					to="/"
				>
					Github Issues
				</Link>
				<Link to="/issues">Issues</Link> */}
			</nav>
		</header>
	);
};

export default Header;
