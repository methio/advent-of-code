const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const regex =  /mul\(-?\d+,-?\d+\)/g;
    const muls = data.match(regex);

    let sum = 0;
    muls.forEach(m => {
        const a = m.split('(')[1].split(',')[0];
        const b = m.split(',')[1].split(')')[0];
        sum += a * b;
        console.log(a, b, sum);
    });
});