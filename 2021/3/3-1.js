const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  // split par retour à la ligne
  data = data.split('\n');

  // variables pour la position 
  let result = 0;
  let HorizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  //console.log(data);

  for(let line of data){
    let [direction, quantite] = line.split(' ');
    quantite = parseInt(quantite);
    //console.log(direction, quantite);

    if(direction == 'up'){
      aim -= quantite;
    }else if(direction == 'down'){
      aim += quantite;
    }else if(direction == 'forward'){
      HorizontalPosition += quantite;
      depth += aim * quantite;
    }        
  }

  console.log("horizontal: " + HorizontalPosition + " | depth: " + depth);
  result = HorizontalPosition * depth;
  console.log("result: " + result);
});