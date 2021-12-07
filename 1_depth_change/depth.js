const fs = require('fs');
const readline = require('readline');

async function process() {
	const fileStream = fs.createReadStream('../sonar-readings-data.txt');
	let counter = 0;
	let prev;
	rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await (const line of rl) {
		const curr = parseInt(line);

		if (!prev) {
			prev = curr;
			continue;
		}

		if (prev - curr < 0) {
			counter++;
		}

		prev = curr;

	}

	console.log(counter);
}

process();
