const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let doublons = 0;
  let pairs = data.split('\n');
  
  for(let pair of pairs){
    let[a, b] = pair
                    .split(',')
                    .map((item) => item.split('-').map((itemSplitted) => parseInt(itemSplitted)))
                    .map((iIS) => { //iSD -> int Item Splitted 

                        // pour chaque paire (a et b) puis (a' et b') 
                        // on boucle pour avoir chaque un tableau 
                        // avec chaque valeur entre a et b
                        let iISC = [];
                        for(let i = iIS[0]; i <= iIS[1]; i++){
                            iISC.push(i);
                        }
                        return iISC;
                    });
    
    // console.log(a, b);

    // si des a se retrouvent dans b, alors on augmente doublons
    // some -> for an array, return true if it matches the includes condition
    if (a.some((double) => b.includes(double))) doublons++;


  }
  console.log(doublons);
});