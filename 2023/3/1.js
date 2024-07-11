const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  /*
  *
  *   On split la donnée en ligne
  *   On parcourt chaque cellule de chaque ligne
  *   Si on trouve un digit (x = 4) on parcourt les cellules suivantes jusqu'à ce qu'il n'y ait plus de digit.
  *   On reconstitue le nombre
  *   On parcourt les cellules adjecentes 
  *   Si symbol trouvé alors on ajoute le nombre dans le tableau des "résultats"
  *   
  *   On se déplace de X cellules (nombre.length) et on continue à scanner
  *   
  *   number={ num: 234,
  *     position: [{x: 3, y: 12}, {x: 4, y: 12}, {x: 5, y: 12}],
  *     adjacents: [".",".",".","?"]
  *   }
  *   
  *   résultats = array de ok   * 
  * 
  */

  // parse data
  const lines = data.split('\n').map(line => line.split(''));

  // helpers
  const isDigit = char => /[0-9]/.test(char);
  const isSymbol = char => char !== '.' && !isDigit(char);
  const checkAdjacent = (cells) => {
    let HasASymbol = false;
    cells.forEach(cell => {
      const {x, y} = cell;
      for(let cy = -1; cy <= 1; cy ++){
        for(let cx = -1; cx <= 1; cx ++){
          const adjaX = x + cx;
          const adjaY = y + cy;
          if(adjaX >= 0 && adjaX < lines[0].length){
            if(adjaY >= 0 && adjaY < lines.length){
              // console.log(lines[adjaY][adjaX], isSymbol(lines[adjaY][adjaX]))
              if(isSymbol(lines[adjaY][adjaX])) HasASymbol = true;
            }
          }
        }
      }       
    }); 
    return HasASymbol;
  };
  const isInBound = (pos, max) => {pos >= 0 && pos < max}
  const findNumber = (indexLine, indexCell) => {
    const result = {
      num : [],
      posDigitsNum : []
    }
    while(isDigit(lines[indexLine][indexCell])){
      result.num.push(lines[indexLine][indexCell]);
      result.posDigitsNum.push({x: indexCell, y: indexLine})
      indexCell++;
    }
    result.num = parseInt(result.num.join(''))
    return result;
  }

  let sum = 0; 

  lines.forEach((line, indexLine) => {
    for(let indexCell = 0; indexCell <= line.length; indexCell++){
      if(isDigit(line[indexCell])){
        // test cell to find number
        const number = findNumber(indexLine, indexCell);
        const isAPart = checkAdjacent(number.posDigitsNum);
        if(isAPart)sum+=number.num;
        // move to right according to number length
        indexCell+=number.num.toString().length;
      }
    }
  });

  console.log(`sum is ${sum}`)

});

// TEST 1  -> parcourir chaque cellule
// const checkAdjacent = (y, x, debug = false) => {
//   for(let cx = -1; cx <= 1; cx ++){
//     for(let cy = -1; cy <= 1; cy ++){
//       const posY = y + cx;
//       const posX = x + cy;
//       if(posY > 0 && posY < lines.length && posX > 0 && posX < lines[0].length){
//         const tile = lines[posY][posX];
//         if(debug)console.log(tile);
//         if(isSymbol(tile)){
//           return true;
//         }
//       }          
//     }
//   }    
// };
// const findNumber = (curLine, x) => {
//   const num = [];
//   let o = x;
//   while(isDigit(curLine[o])){
//     num.unshift(curLine[o]);
//     o--;
//   }
//   let p = x+1;
//   while(isDigit(curLine[p])){
//     num.push(curLine[p]);
//     p++;
//   }
//   return parseInt(num.join(''));
// }

// // console.log(lines);

// const partNums = [];

// lines.forEach((line, y) => {
//   line.forEach((char, x) => {

//     // check if adjacent cell is a symbol
//     if(checkAdjacent(y, x, false)){
//       // now check if matching char is a digit
//       if(isDigit(char)){
//         partNums.push(findNumber(line, x));
//         // console.log(findNumber(line, x));
//       }
//     }
    
//     //faire le tour + si un adjacent n'est pas '.' ou 'nb' alors il faut compter le nombre
//   });
// });

// console.log(partNums);
// partNums.forEach((item, index) => {
//   if(index>0&&index<partNums.length){
//     if(item == partNums[index+1]){
//       partNums.splice(index, 1);
//     }
//   }

// });
// console.log(partNums);

// // const partNumsNoD = [...new Set(partNums)];
// // console.log(partNumsNoD);
// const sum = partNums.reduce((a, c)=> a+c);
// console.log(sum)