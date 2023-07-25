const fs = require('fs');
console.clear();
console.log('---------------------------');

/* stole it from https://github.com/ashugeo/advent-of-code/blob/master/2022/7-1.js */
fs.readFile('input.txt', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const tree = { '/': {} };
  const path = [];

  const blocks = [];
  for (const line of data.split('\n')) {
    if (line.startsWith('$')) {
      blocks.push([]);
    }

    blocks[blocks.length - 1].push(line);
  }

  // console.log(blocks);

  const toTree = (item) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];

    const dir = eval(`tree['${path.join("']['")}']`);

    if (typeof value === 'string') dir[key] = parseInt(value);
    else dir[key] = {};
  };

  for (let block of blocks) {
    const [_, cmd, dir] = block[0].split(' ');

    if (cmd === 'cd') {
      if (dir === '..') {
        path.pop();
      } else {
        path.push(dir);
      }
      // console.log(cmd, dir);
    } else if (cmd === 'ls') {
      block.shift();

      for (const item of block) {
        const [a, b] = item.split(' ');

        if (a === 'dir') toTree({ [b]: {} });
        else toTree({ [b]: a });
      }
    }
  }

  console.log(JSON.stringify(tree, null, 4));

  let total = 0;

  const getSize = (path) => {
    const dir = eval(`tree['${path.join("']['")}']`);

    for (const [key, val] of Object.entries(dir)) {
      if (typeof val === 'object') {
        let _path = JSON.parse(JSON.stringify(path));
        _path.push(key);
        getSize(_path);
      }
    }

    const sum = JSON.stringify(dir)
      .match(/\d+/g)
      .reduce((acc, curr) => acc + parseInt(curr), 0);

    if (sum <= 100000) total += sum;
  };

  getSize(['/']);
  console.log(total);
});