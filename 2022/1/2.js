const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let elves = data
          .split('\n\n')                                                                         // split par retour ligne *2
          .map((d) => d.split('\n')                                                              // crée un array dans une nouvelle dimension à chaque \n,
          .map((n) => parseInt(n)))                                                              // puis transforme ce string en integer
          .map((a) => a.reduce((accumulator, currentValue) => accumulator + currentValue))       // parcours chaque entrée de l'array ajoute la valeur courante à l'accumulateur
          .sort((a,b) => b - a);                                                                 // trier par ordre décroissant

 /*
  Version 1, un peu long  
  let maxVal1 = Math.max(...elves); 
  let maxIndex = elves.indexOf(maxVal1);
  elves.splice(maxIndex, 1);
  let maxVal2 = Math.max(...elves);
*/

  console.log(elves[0], elves[1], elves[2], elves[0]+elves[1]+elves[2]);


});