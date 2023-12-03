const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;


  const lines = data
                  .split('\n')
                  .map(l => l.replace(/\D/g,'')); //filter on int

  // get first and last int
  let res = [];
  // lines.forEach(line => res.push(`${line.charAt(0)}${line.charAt(line.length -1)}`));
  // res.forEach(r => sum += parseInt(r));

  // parse first and last int to create a number and add it to sum
  let sum = 0;
  lines.forEach(line => sum += parseInt(`${line.charAt(0)}${line.charAt(line.length -1)}`));


  console.log(sum);
});