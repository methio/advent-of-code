const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
    if(err) throw err;

    console.log(data);
});

