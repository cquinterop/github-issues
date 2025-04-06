import { QuerySearchArgs } from '@/__generated__/graphql';
import { InMemoryCache } from '@apollo/client';

interface CacheKeyType extends QuerySearchArgs {
	page: number;
}

const getCacheKey = ({ query, page }: CacheKeyType) => `query:${query}-page:${page}`;

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				search: {
					keyArgs: false,
					read: (existing, { variables }) => existing?.[getCacheKey(variables as CacheKeyType)],
					merge: (existing, incoming, { variables }) => ({
						...(existing || {}),
						[getCacheKey(variables as CacheKeyType)]: incoming,
					}),
				},
			},
		},
	},
});
