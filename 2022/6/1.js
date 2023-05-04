const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.trim()
             .split('');

    // console.log(data);

    let result = 0;
    let ok = '';

    data.some( (el, index, array) => {
            if(!doubleChar([data[index], data[index+1], data[index+2], data[index+3]])){
                result = index+4;
                ok = [data[index], data[index+1], data[index+2], data[index+3]].join('');
                return true;
            }
        
    });

    console.log(result, ok, 'yolereap');
});


const doubleChar = (array) => array.some((e, i, a) => a.indexOf(e) !== i);