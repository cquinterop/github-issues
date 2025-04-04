import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
	{ ignores: ["dist", "src/components/ui", "src/__generated__"] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			pluginReact.configs.flat.recommended,
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			prettier,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'prettier/prettier': ['error'],
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/sort-type-constituents': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-sort-props': ['warn', { callbacksLast: true, multiline: 'first', shorthandFirst: true }],
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			semi: ["error", "always"],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	});
