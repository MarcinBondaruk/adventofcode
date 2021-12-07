const fs = require('fs');
const readline = require('readline');

function interpretLine() {}

async function process() {
  let depth = 0;
  let horizontal = 0;
  dataStream = fs.createReadStream('../steering-data.txt');
  rl = readline.createInterface({
    input: dataStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    splitted = line.split(' ');

    switch (splitted[0]) {
      case 'up':
        depth -= parseInt(splitted[1]);
        break;
      case 'down':
        depth += parseInt(splitted[1]);
        break;
      case 'forward':
        horizontal += parseInt(splitted[1]);
        break;
    }
  }

  return {
    depth: depth,
    horizontal: horizontal,
    multi: depth * horizontal
  }
}

process().then((result) => console.log(result));
