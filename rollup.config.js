import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import globFiles from 'rollup-plugin-glob-files';
import command from 'rollup-plugin-command';

import pkg from './package.json';

const building = process.env.NODE_ENV === 'production';
const testing = process.env.NODE_ENV === 'test';
const watching = process.env.ROLLUP_WATCH;
const plainTests = process.env.BLAND_TESTS;

const plugins = [
	resolve(),
	commonjs(),
	sucrase({
		transforms: ['typescript'],
	}),
];

const watch = {};

const build = {
	input: `src/index.ts`,
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' },
	],
	plugins,
	watch,
};

const test = {
	input: `@tests`,
	output: { file: pkg.main, format: 'cjs' },
	plugins: [
		globFiles({
			key: `@tests`,
			include: `./tests/**/*.ts`,
			justImport: true,
		}),
		...plugins,
		command(plainTests ? `` : `zip-tap-reporter ` + `node ${pkg.main}`, {
			exitOnFail: !watching,
		}),
	],
};

export default building ? build : test;
