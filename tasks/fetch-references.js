import { exec } from 'child_process';
import fs from 'fs';

const sections = ['background', 'identity', 'reality', 'capitalism'];

sections.forEach((section) => {
	exec(
		`citation-js -i static/references/${section}.ris -f html -s citation-chicago -R`,
		(error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}

			const filepath = `src/data/${section}.html`;
			const CWD = process.cwd();

			(async () => {
				try {
					const file = `${CWD}/${filepath}`;
					fs.writeFileSync(file, stdout);
				} catch (err) {
					console.log(err);
				}
			})();
		}
	);
});
