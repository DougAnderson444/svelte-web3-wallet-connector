// iterate through all .svelte files in ./package directory
import { globbySync } from 'globby';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageDir = path.resolve(__dirname, './package');
const files = fs.readdirSync(packageDir);
const svelteFiles = globbySync('./package/**/*.svelte');

svelteFiles.forEach((file) => {
	// remove all unused css in <style> tags from this svelte file
	const filePath = path.resolve(file);
	console.log('purging unused css from ', filePath);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const styleTagRegex = /<style[^]+?<\/style>/gi;
	const styleTagContents = fileContents.match(styleTagRegex);

	// get rest of file contents
	const restOfFile = fileContents.replace(styleTagRegex, '');

	// skip over any components without style
	if (!styleTagContents) return;

	// get content between <style> tags
	const styleTagContentRegex = /<style[^]+?<\/style>/i;
	let styleTagContent = styleTagContents[0].match(styleTagContentRegex)[0];

	// regex for string that start with @media and ends with } inlcuding the double closing } }  braces possibly separated by carriage returns or new lines and spaces, inclusive of the last curly brace
	const mediaRegex = /@media[^]+?}[^\\r\\n]+?}/gi;
	const mediaStatements = styleTagContent.match(mediaRegex);

	// remove any media statements from style tag content
	const styleTagContentNoMedia = styleTagContent.replace(mediaRegex, '');

	// regex parse out each class statement, keep the leading . and the {} block but exclude anything in a @media {} block
	const classRegex = /\.([a-zA-Z0-9_-]+)[^]+?{[^]+?}/gi;
	const classStatements = styleTagContentNoMedia.match(classRegex);

	// get all text from inside class="" and "class:" from rest of file
	const classRegex2 = /class:([a-zA-Z0-9_-]+)|class="([^]+?)"/gi;
	const classStatements2 = restOfFile.match(classRegex2);

	if (!classStatements2 || !classStatements2?.length) return;

	// get the string inside the quotes
	const classRegex3 = /class:([a-zA-Z0-9_-]+)|class="([^]+?)"/i;
	let classStatements3 = classStatements2.map((statement) => {
		// check if statement includes the word 'change'
		// console.log('statement3 regex', statement, statement.match(classRegex3));
		return statement.match(classRegex3)[2] || statement.match(classRegex3)[1];
	});

	// filter out nulls
	classStatements3 = classStatements3.filter((statement) => statement);

	// parse the string into an array of classes
	const classRegex4 = /([a-zA-Z0-9_-]+)/gi;
	const classStatements4 = classStatements3.map((statement) => statement.match(classRegex4));

	const keep = classStatements.map((statement) => {
		const className = statement.match(/\.([a-zA-Z0-9_-]+)/i)[1];
		const isUsed = classStatements4.some((statement) => statement.includes(className));
		return isUsed ? statement : '';
	});

	// keep all media statements
	const keepMedia = mediaStatements?.length
		? mediaStatements.map((media) => {
				// get the part of the media statement after the backslash "\:" and before the second opening curly brace "{"
				const matches = media.match(/\\:([a-zA-Z0-9_-]+)[^]+?{/i);
				const className = matches[1];
				const isUsed = classStatements4.some((c) => c.includes(className));
				return isUsed ? media.replace(/[\r\t\s]+/g, '') : '';
		  })
		: [];

	// add media statements to keep
	keep.push(...keepMedia);

	// join keep together
	let newStyleTagContent = keep.join('');

	// wrap in <style> tags
	const newStyleTagBlock = `<style>${newStyleTagContent}</style>`;

	// replace old style tag with new style tag
	const newFileContents = fileContents.replace(styleTagContent, newStyleTagBlock);

	// write new file contents to file
	fs.writeFileSync(filePath, newFileContents);
});

// end process
process.exit(0);
