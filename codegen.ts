
import type { CodegenConfig } from '@graphql-codegen/cli';
import { VITE_API_BASE_URL, GITHUB_API_KEY } from './src/config/env';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
		{
			[`${VITE_API_BASE_URL}/graphql`]: {
				headers: {
					Authorization: `Bearer ${GITHUB_API_KEY}`,
				},
			},
		},
	],
  documents: "src/**/*.tsx",
  generates: {
		'src/__generated__/types.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
  },
	ignoreNoDocuments: true,
};

export default config;
