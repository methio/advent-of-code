const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
if (err) throw err;

data = data .split('\n')                        // split on 2 lines
            .map(d=>[...d.matchAll(/\d+/g)])    // get int (still string) from each line and store in array
            .map(e=>parseInt(e.join("")));      // join each string and then parse it to a big Int

// const possibilities = [];

const duration = data[0];
const TargetDistance = data[1];    
let possibilities = 0;

for(let i = 1; i < duration; i++){
    const timePressed = i;
    const remainingTime = duration - timePressed;
    const distance = timePressed * remainingTime;

    // console.log(`duration: ${duration} | tPr: ${timePressed} | ${distance}mm ~> ${TargetDistance}mm`)
    if(distance>TargetDistance){
        possibilities++;
    }
}

// possibilities.push(possibility);

// const sum = possibilities.reduce((acc, c)=> acc * c);
console.log(possibilities);

});