const fs = require('fs');
const readline = require('readline');

async function process() {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  dataStream = fs.createReadStream('../steering-data.txt');
  rl = readline.createInterface({
    input: dataStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    splitted = line.split(' ');

    switch (splitted[0]) {
      case 'up':
        aim -= parseInt(splitted[1]);
        break;
      case 'down':
        aim += parseInt(splitted[1]);
        break;
      case 'forward':
        horizontal += parseInt(splitted[1]);
        depth += aim * parseInt(splitted[1]);
        break;
    }
  }

  return {
    depth: depth,
    horizontal: horizontal,
    aim: aim,
    multi: depth * horizontal
  }
}

process().then((result) => console.log(result));
