const fs = require('fs');
const readline = require('readline');

async function process() {
        const fileStream = fs.createReadStream('../data.txt');
	let i = 0;
        let counter = 0;
	let prev;
        const t = [];
        rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
        });

        for await (const line of rl) {
		curr = parseInt(line);
		// read 3 values then process on every next line + shift
		if (i < 3) {
			t.push(curr);
			i++;
			continue;
		}

		if (t.shift() - curr < 0) {
			counter++;
		}

		t.push(curr);
        }

        console.log(counter);
}

process();
