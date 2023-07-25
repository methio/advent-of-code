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
            }        
    });

    // console.log(instructions.length)

    let X = 1;
    let cycle = 0;
    const signals = [];
    let sum = 0;

    instructions.forEach((instruction, index) => {

        const [type, value] = instruction;

        let cycles = type === "addx" ? 2 : 1;

        for(let i = 1; i <= cycles; i+=1){
            cycle += 1;
            if([20, 60, 100, 140, 180, 220].includes(cycle)){
                console.log("cycle to save", {cycle, X});
                signals.push(cycle*X);
            }            
        }

        if(value != undefined){ 
            // if(cycle > 140) console.log(`X - ${X} + ${value} = ${X + value}`)      

            X += value;            
        }
    });

    console.log(signals);

    const total = signals.reduce((total, currentValue) => {
        return total += currentValue;
    })
    console.log(total);


});