const fs = require('fs');

console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if(err) throw err;


  const inp = data.split(',').map(n=>parseInt(n));

  const operation = (type, input1, input2, output) => {
    if(type===1) inp[output] = input1 + input2;
    else inp[output] = input1 * input2;
  }

  for(let i = 0; i < inp.length; i+=4){

    if(inp[i] === 1 || inp[i] === 2){
      operation(inp[i], inp[inp[i+1]], inp[inp[i+2]], inp[i+3]);
    } else {
      console.log(`the sign is ${inp[i]}, program stops here`);
      break;
    }
  }

  console.log(inp[0])

});