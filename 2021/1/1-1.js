const fs = require('fs');
let result = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {

  if(err) throw err;

  // split par retour à la ligne
  data = data.split('\n');

  // vérifier que chaque ligne est inférieure à celle d'avant
  for(let i=0; i< data.length; i++){
    
    let previousData = parseInt(data[i - 1]);
    let currentData = parseInt(data[i]);
    //let nextData = parseInt(data[i + 1]);

    if(previousData < currentData){
      result++;
    }
  }
  console.log(result);
});