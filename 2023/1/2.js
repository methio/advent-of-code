const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;


  // in -> What is detected
  // out -> Replaced by (add first and last letter of each number)
  const words = [
    {in: "one",   out: 'o1e'},
    {in: "two",   out: 't2o'},
    {in: "three", out: 't3e'},
    {in: "four",  out: 'f4r'},
    {in: "five",  out: 'f5e'},
    {in: "six",   out: 's6x'},
    {in: "seven", out: 's7n'},
    {in: "eight", out: 'e8t'},
    {in: "nine",  out: 'n9e'}
  ];

  // replace in the data
  for(let w of words){
      data = data.replaceAll(w.in, w.out)
  }

  const lines = data
                  .split('\n')
                  .map(l => l.replace(/\D/g,'')); //filter on int


  let sum = 0;

  // parse first and last int to create a number and add it to sum
  lines.forEach(line => sum += parseInt(`${line.charAt(0)}${line.charAt(line.length -1)}`));


  console.log(sum);
});