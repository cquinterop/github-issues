import { QuerySearchArgs } from '@/__generated__/graphql';
import { InMemoryCache } from '@apollo/client';

interface CacheKeyType extends QuerySearchArgs {
	page: number;
}

const getSearchCacheKey = ({ query, page }: CacheKeyType) => `query:${query}-page:${page}`;
const getRepoCacheKey = ({ number }) => `number:${number}`;
const getCommentsCacheKey = ({ number, after }) => `number:${number}-after:${after}`;

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				search: {
					keyArgs: false,
					read: (existing, { variables }) => existing?.[getSearchCacheKey(variables as CacheKeyType)],
					merge: (existing, incoming, { variables }) => ({
						...(existing || {}),
						[getSearchCacheKey(variables as CacheKeyType)]: incoming,
					}),
				},
				repository: {
					keyArgs: false,
					read: (existing, { variables }) => existing?.[getRepoCacheKey(variables)],
					merge: (existing, incoming, { variables }) => ({
						...(existing || {}),
						[getRepoCacheKey(variables)]: incoming,
					}),
				},
			},
		},
		IssueComment: {
			fields: {
				comments: {
					keyArgs: false,
					read: (existing, { variables }) => existing?.[getCommentsCacheKey(variables as CacheKeyType)],
					merge: (existing, incoming, { variables }) => ({
						...(existing || {}),
						[getCommentsCacheKey(variables as CacheKeyType)]: incoming,
					}),
				},
			},
		}
	},
});
