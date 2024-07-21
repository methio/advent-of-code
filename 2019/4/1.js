const fs = require('fs');

fs.readFile('test.txt', 'utf8', (err, data) => {
    if(err) throw err;

    //256310-732736
    // range 
    // adjacent pair
    // increase L to R

    const start = parseInt(data.split('-')[0]);
    let nt = start;
    const end = parseInt(data.split('-')[1]);
    const possibilities = [];

    const isIncreasing = num => {
        return num.charAt(0) <= num.charAt(1) && num.charAt(1) <= num.charAt(2) && num.charAt(2) <= num.charAt(3) && num.charAt(3) <= num.charAt(4) && num.charAt(4) <= num.charAt(5)
    }

    const isAdjacent = num => {
        return num.charAt(0) === num.charAt(1) || num.charAt(1) === num.charAt(2) || num.charAt(2) === num.charAt(3) || num.charAt(3) === num.charAt(4) || num.charAt(4) === num.charAt(5)
    }

    while(nt <= end){
        // console.log(`num : ${nt} - increase:${isIncreasing(nt.toString())} - adjacent:${isAdjacent(nt.toString())}`);

        if(isIncreasing(nt.toString())){
            if(isAdjacent(nt.toString())){
                possibilities.push(nt);
            }
        }
        nt++;

    }

    console.log(possibilities.length);


});