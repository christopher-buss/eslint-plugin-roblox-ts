import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	eslintPluginPrettierRecommended,
	{
		rules: {
			"prettier/prettier": [
				"warn",
				{
					semi: true,
					trailingComma: "all",
					singleQuote: false,
					printWidth: 120,
					tabWidth: 4,
					useTabs: true,
					arrowParens: "avoid",
				},
			],
			"@typescript-eslint/array-type": [
				"warn",
				{
					default: "generic",
					readonly: "generic",
				},
			],
		},
	},
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.eslint.json",
				ecmaVersion: 2018,
				sourceType: "module",
			},
		},
	},
);
