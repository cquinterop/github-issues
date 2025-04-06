import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { PropsWithChildren } from 'react';

const LayoutPage = ({ children }: Readonly<PropsWithChildren>) => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="container mx-auto flex-1 pt-16 pb-6 sm:px-3 lg:px-6">{children}</main>
			<Footer />
		</div>
	);
};

export default LayoutPage;
