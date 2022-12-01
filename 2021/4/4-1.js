const fs = require('fs');
const { clear, log } = require('console');
clear();
log('/'.repeat(100));

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if(err) throw err;   

    data = data.split('\n').filter(d => d);
    data.shift();
    
    // get rows
    let rows = [];
    data.forEach(el => {
        el = el.split(' ').filter(d => d);
        rows.push(el);
    });
    // log(rows);

    // get cols
    let cols = [];
    // log(rows[0].length);
    for(let i = 0; i < rows.length; i+=5){
        for(let p = 0; p < 5; p++){
            cols.push(`${rows[i][p]} , ${rows[i+1][p]} , ${rows[i+2][p]} , ${rows[i+3][p]} , ${rows[i+4][p]}`);
        }
    }    
    log(cols);

});