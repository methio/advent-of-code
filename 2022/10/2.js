const fs = require('fs');
const _ = require('lodash');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    let instructions = data.split('\n');
    instructions.forEach((el, index) => {        
        instructions[index] = el.split(' ');
            if(instructions[index][0].includes('addx')){
                instructions[index][1] = parseInt(instructions[index][1]);
            }else{
                instructions[index].push(0);
            }     
    });
    console.log(instructions)

    let x = 1;
    let cycle = 0;
    let CRT = [];

    instructions.forEach((instruction, index) => {
        const [value, amount] = instruction;
        const currentCycles = value === "addx" ? 2 : 1;        
        for(let i = 1; i <= currentCycles; i++){    
            if ([41, 81, 121, 161, 201].includes(cycle)) x += 40;        
            if([x-1, x, x+1].includes(cycle)) CRT.push('#');
            else CRT.push('.');            
            cycle+=1;            
        }
        
        x += amount;
        
    });

    // display CRT 
    // console.log(CRT)

    const display = splitString(CRT.join(''), 40);
    console.log(display);
});

const splitString = (str, N) => {
    const arr = [];  
    for (let i = 0; i < str.length; i += N) {
      arr.push(str.substring(i, i + N));
    }
    return arr;
  }