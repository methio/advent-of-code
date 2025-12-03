const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    let currentPos = 50;
    let azero = 0;

    data.split('\n').forEach((l, index) => {
        const dir = l.substring(0,1);
        const val = parseInt(l.substring(1));

        for(let i = 0; i < val ; i++){
            if(dir == "L"){                  
                currentPos--;                
                if(currentPos < 0)currentPos = 99;
                if(currentPos == 0)azero++;
            }else if(dir == "R"){
                    currentPos++;                
                    if(currentPos > 99)currentPos = 0;  
                    if(currentPos == 0)azero++;
            }else{
                console.log(`neither R or L at index ${index}`);
            }
        }
    });
    console.log(azero);
});