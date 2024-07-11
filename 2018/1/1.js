const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.split('\n')
              .map(i => parseInt(i));

    //   let part1 = data.reduce((acc, cur) => acc + cur, start);


    let currentFrequency = 0;
    const frequencies = [0];

    let twice = [];

    const check = () => {
        data.forEach(change => {
            let resultFrequency = currentFrequency + change;            
            if(frequencies.includes(resultFrequency))twice.push(resultFrequency)
            frequencies.push(resultFrequency);
            currentFrequency = resultFrequency
        });
    }

    while(twice.length < 1){
        check();
    }
  
    console.log(twice[0])
});