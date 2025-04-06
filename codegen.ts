import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { VITE_API_BASE_URL,  VITE_GITHUB_API_KEY } from './src/config/env';

const config: CodegenConfig = {
	overwrite: true,
	schema: [
		{
			[`${VITE_API_BASE_URL}/graphql`]: {
				headers: {
					Authorization: `Bearer ${ VITE_GITHUB_API_KEY}`,
					'User-Agent': 'IssueTracker',
				},
			},
		},
	],
	documents: ['src/pages/**/*.tsx'],
	generates: {
		'./src/__generated__/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
		'./src/__generated__/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
