const fs = require('fs');
const readline = require('readline');

async function process() {
  let lineLength = 0;
  let lines = 0;
  let buffer = [];

  const dataStream = fs.createReadStream('../binary-diagnostics-data.txt');
  rl = readline.createInterface({
    input: dataStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (lines === 0) {
      lineLength = line.length;
      for (let i = 0; i < lineLength; i++) {
        buffer.push(parseInt(line[i]));
      }
      lines++;
      continue;
    }

    for (let i = 0; i < lineLength; i++) {
      buffer[i] += parseInt(line[i]);
    }

    lines++;
  }

  return {
    buffer: buffer,
    linesNo: lines,
    lineLength: lineLength
  }
}

process()
  .then((result) => {
    let gammaRateBinary = '';
    let epsilonRateBinary = '';
    const halved = result.linesNo/2;

    for (let i = 0; i < result.lineLength; i++) {
      if (result.buffer[i] > halved) {
        gammaRateBinary += '1';
        epsilonRateBinary += '0';
      } else {
        gammaRateBinary += '0';
        epsilonRateBinary += '1';
      }
    }

    console.log({
      gammaRate: parseInt(gammaRateBinary, 2),
      epsilonRate: parseInt(epsilonRateBinary, 2),
      powerConsumption: parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2)
    })
  });
