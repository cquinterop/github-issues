import { type PropsWithChildren, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GITHUB_API_KEY, VITE_API_BASE_URL } from '@/config/env';

export const cache = new InMemoryCache(/* {
	typePolicies: {
		Query: {
			fields: {
			},
		},
	},
} */);

const createApolloClient = () => {
	return new ApolloClient({
		uri: `${VITE_API_BASE_URL}/graphql`,
		cache,
		headers: {
			Authorization: `Bearer ${GITHUB_API_KEY}`,
		},
		defaultOptions: {
			query: {
				fetchPolicy: 'cache-first',
			},
		},
	});
};

const DataProvider = ({ children }: Readonly<PropsWithChildren>) => {
	const client = useMemo(() => createApolloClient(), []);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;
