module.exports = {
	env: {
		browser: false,
	},
	extends: ["airbnb", "prettier", "prettier/react"],
	"parser": "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
	},
	plugins: ["react", "prettier"],
	rules: {
		"react/jsx-filename-extension": [
			1,
			{
				extensions: [".js", ".jsx"],
			},
		],
		"prettier/prettier": [
			"error",
			{
				trailingComma: 'es5',
				printWidth: 100,
			},
		],
		indent: ["error", 2,{ "SwitchCase": 1 }],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
	},
};
