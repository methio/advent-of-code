const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.trim();

    // console.log(data);

    let result = 0;

    [...data].some( (el, index, array) => {
            const chars = data.substring(index, index+14);
            // console.log(chars)
            if(!doubleChar(chars)){
                result = `index is ${index+14} and chars = ${chars}`;
                return true;
            }
        
    });

    console.log(result);
});


const doubleChar = (string) => [...string].some((e, i, a) => a.indexOf(e) !== i);