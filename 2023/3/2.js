const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  // parse data
  const lines = data.split('\n').map(line => line.split(''));

  // helpers
  const isDigit = char => /[0-9]/.test(char);
  const isSymbol = char => char !== '.' && !isDigit(char);
  const isStar = char => char === '*';
  const getAdjacentNumbers = (indexCell, indexLine) => {
    const nums = [];
      const x = indexCell;
      const y = indexLine;

      for(let cy = -1; cy <= 1; cy ++){
        for(let cx = -1; cx <= 1; cx ++){
          const adjaX = x + cx;
          const adjaY = y + cy;
          if(adjaX >= 0 && adjaX < lines[0].length){
            if(adjaY >= 0 && adjaY < lines.length){
              if(isDigit(lines[adjaY][adjaX])){
                // console.log(`trigger digit is ${lines[adjaY][adjaX]}`)
                num = findNumber(adjaY, adjaX);

                if(!nums.includes(num)) nums.push(num);
              }
            }
          }
        }
      }  
    return nums;
  };
  const isInBound = (pos, max) => {pos >= 0 && pos < max}
  const findNumber = (indexLine, indexCell) => {
    const num = [];
    let pos = indexCell;
    while(isDigit(lines[indexLine][pos])){
        num.unshift(lines[indexLine][pos]);
        pos--;
      }
    pos = indexCell+1;
    while(isDigit(lines[indexLine][pos])){
      num.push(lines[indexLine][pos]);
      pos++;
    }
    return parseInt(num.join(''));
  }

  let sum = 0; 

  lines.forEach((line, indexLine) => {
    for(let indexCell = 0; indexCell <= line.length; indexCell++){
      if(isStar(line[indexCell])){
        // console.log(`symbol is ${line[indexCell]} at line ${indexLine}`)
        const numbers = getAdjacentNumbers(indexCell, indexLine);
        // console.log(`my numbers are ${numbers}`)
        if(numbers.length == 2){
            sum += numbers[0]*numbers[1];
        }
      }
    }
  });

  console.log(`sum is ${sum}`)

});