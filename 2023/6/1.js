const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
if (err) throw err;

data = data .split('\n')                        // split on 2 lines
            .map(d=>[...d.matchAll(/\d+/g)])    // get int (still string) from each line and store in array
            .map(e=>e.map(d=>parseInt(d)));     // convert string to Int

const possibilities = [];

data[0].forEach((duration, index) => {
    const TargetDistance = data[1][index];    
    let possibility = 0;

    for(let i = 1; i < duration; i++){
        const timePressed = i;
        const remainingTime = duration - timePressed;
        const distance = timePressed * remainingTime;

        // console.log(`duration: ${duration} | tPr: ${timePressed} | ${distance}mm ~> ${TargetDistance}mm`)
        if(distance>TargetDistance){
            possibility++;
        }
    }

    possibilities.push(possibility);
})

const sum = possibilities.reduce((acc, c)=> acc * c)
console.log(possibilities, sum);

});