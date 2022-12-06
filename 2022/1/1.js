const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let elves = data
          .split('\n\n')                                                                         // split par retour ligne *2
          .map((d) => d.split('\n')                                                              // crée un array dans une nouvelle dimension à chaque \n,
          .map((n) => parseInt(n)))                                                              // puis transforme ce string en integer
          .map((a) => a.reduce((accumulator, currentValue) => accumulator + currentValue));      // parcours chaque entrée de l'array ajoute la valeur courante à l'accumulateur

  let maxVal = Math.max(...elves);
  let maxIndex = 1 + elves.indexOf(maxVal);

  console.log(maxVal, maxIndex);
});