const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    // remove don't() parts
    let shouldRemove = true;
    let updatedData = data;
    while(shouldRemove){
        const start = updatedData.indexOf("don't()");
            if(start === -1) shouldRemove = false; // make sure it's not the last don't()
            else{
                const startWithSub = updatedData.substring(start);
                let end = startWithSub.indexOf("do()");
                if(end === -1){     // in case last command is a don't(), use the rest of the string
                    end = updatedData.length;
                }else{
                    end = (end+4)+start;
                }
                const toRemove = updatedData.substring(start, end);
                updatedData = updatedData.replace(toRemove, '');
            }
            
    }
    
    const mulRegex =  /mul\(-?\d+,-?\d+\)/g;
    const muls = updatedData.match(mulRegex);

    let sum = 0;
    muls.forEach(m => {
        const a = m.split('(')[1].split(',')[0];
        const b = m.split(',')[1].split(')')[0];
        sum += a * b;
    });
        console.log(sum);

});