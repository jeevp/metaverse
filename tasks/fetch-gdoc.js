import fs from 'fs';
import archieml from 'archieml';
import fetch from 'node-fetch';

const CWD = process.cwd();

const doc = {
	id: '15VLXQwU2hsz-zI5jsQQMnfLKGhBhFxJ1puq8YLKC2fc',
	filepath: 'src/data/copy.json'
};

const fetchGoogle = async (id) => {
	console.log(`fetching...${id}`);

	const base = 'https://docs.google.com';
	const post = `document/d/${id}/export?format=txt`;
	const url = `${base}/${post}`;

	try {
		const response = await fetch(url);
		const text = await response.text();
		const parsed = archieml.load(text);
		const str = JSON.stringify(parsed);
		return str;
	} catch (err) {
		throw new Error(err);
	}
};

(async () => {
	try {
		const str = await fetchGoogle(doc.id);
		const file = `${CWD}/${doc.filepath}`;
		fs.writeFileSync(file, str);
	} catch (err) {
		console.log(err);
	}
})();
