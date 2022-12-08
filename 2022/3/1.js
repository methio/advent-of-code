const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let rucksacks = data.split('\n');
  let score = 0;
  let newLine = true;
  let abc = "abcdefghijklmnopqrstuvwxyz";

  rucksacks.forEach((sack, index) => {

    // get the two compartiments
    let comp1 = sack.substring(0, sack.length/2);           // get some part of a string : substring(start, end)
    let comp2 = sack.substring(sack.length/2, sack.length);

    // detect the double
    // pour chaque char de comp1 on vérifie si il existe dans comp2, on pousse le doublon dans doublons
    [...comp1].forEach((item, index) => {
        let doublonPos = comp2.search(item);
        if(doublonPos != -1 && newLine){
            newLine = false;

            // get sum of these items
            if(item.toLowerCase() === item){                                    // 👀 https://bobbyhadz.com/blog/javascript-check-if-letter-in-string-is-uppercase-or-lowercase
                score += abc.indexOf(item) +1;
            }else{
                score += abc.toUpperCase().indexOf(item.toUpperCase()) +1 +26; 
            }

            // console.log(item, abc.indexOf(item), abc.toUpperCase().indexOf(item.toUpperCase()));
        }
    });
    newLine = true;
  });
  console.log(`end score is ${score}`);
});