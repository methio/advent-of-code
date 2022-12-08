const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let rucksacks = data.split('\n');
  let score = 0;
  let newLine = true;
  let abc = "abcdefghijklmnopqrstuvwxyz";


  for(let i = 0; i < rucksacks.length; i+=3){

    // shorthand three rows
    let r1 = rucksacks[i];
    let r2 = rucksacks[i + 1];
    let r3 = rucksacks[i + 2];

    console.log(r1, r2, r3);

    let badge = r1
                .split('')      // r1 becomes an array
                .find(element => r2.includes(element) && r3.includes(element));
    
    console.log(badge);

    score += 
    abc.indexOf(badge) + 1 ||
    abc.toUpperCase().indexOf(badge.toUpperCase()) + 1 + 26;
  }

  console.log(`end score is ${score}`);
});