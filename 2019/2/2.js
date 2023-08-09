const fs = require('fs');

console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if(err) throw err;

  const inpt = data.split(',').map(n=>parseInt(n));

  // reference : https://github.com/claytonjwong/advent-of-code/blob/master/2019/02_program_alarm/main.cpp
  const checker = (noun, verb, ...Arr) => {
    Arr[1] = noun;
    Arr[2] = verb;

    for(let i = 0; i < Arr.length; i+=4){
      let [op, i1, i2, ot] = [Arr[i], Arr[i+1], Arr[i+2], Arr[i+3]];
      if(op === 99) break;
      else if(op === 1) Arr[ot] = Arr[i1] + Arr[i2];
      else if(op === 2) Arr[ot] = Arr[i1] * Arr[i2];
      else console.log(`${op} 👈🏻 smthing went wrong`);
    }
    return Arr[0];
  }

  // console.log(`part 1 to be sure : ${checker(12, 2, ...inpt)}`);

  const desiredOutput = 19690720;


  for(let n = 0; n <= 99; n++){
    for(let v = 0; v <= 99; v++){
      if(checker(n, v, ...inpt) === desiredOutput){
        console.log(`✨ part 2 : ${n}, ${v} -- ${100 * n + v}`);
      }
    }
  }  
});