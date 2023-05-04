const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  // on sépare les rules des crates : double retour ligne

  //console.log(data)
  let [s, i] = data.split('\n\n');

  // on split les stacks pour avoir un tableau de tableau avec chaque crates 
  let stacks = new Array(s[0].length);

  s = s.split('\n')
        .map(ss=>ss.match(/.{1,4}/g) ?? [])
        .slice(0, -1)
        .map(ss=> ss.map(sss=> sss.trim()))
        .map(ss => ss.map( (sss, index) => stacks[index] += sss));

  stacks = stacks.map( sRee => sRee = sRee.slice(9).match(/.{1,3}/g));

  // console.log(stacks);

  // on split les instructions par ligne
  i = i.split('\n');

  // on organise les instructions 
  const instructions = [];
  i.forEach( (instruction, index) => {
    // console.log(instruction)
    const teste = instruction;
    let reducedInstructions = teste.match(/\d/g);
    // console.log(reducedInstructions);
    if(reducedInstructions.length >= 4){
      // const re = reducedInstructions.slice(0,2).join('');
      const re = reducedInstructions.splice(0,2).join('');
      reducedInstructions.unshift(re);
      // reducedInstructions = reducedInstructions.map( ([r1, r2, r3, r4]) => [`${r1}${r2}`, r3, r4])
      
    }
    console.log(reducedInstructions);
    

    //reducedInstructions.map(([el1, el2, ...other]) => el2 === 0 ? [el1+el2, ...other] : [el1, el2, ...other]);

    // instructions.push({ -- sauvegarde
    //   "numToMove": parseInt(reducedInstructions[0], 10),
    //   "from": reducedInstructions[1],
    //   "to": reducedInstructions[2]
    // });

    // instructions.push({
    //     "numToMove": instruction.substring(5, 7).trim(),
    //     "from": instruction.substring(12, 14).trim() - 1,
    //     "to": instruction.substring(17, 19).trim() - 1
    //   });
  });


  // on fait bouger les crates en fonction des instructions
  // instructions.forEach( (instruction, index) => {
  //   for( let i = 1; i <= instruction.numToMove; i++){
  //     const moved = stacks[instruction.from].shift();      
  //     stacks[instruction.to].unshift(moved);
  //   }
  // });

  //  console.log(stacks)
});