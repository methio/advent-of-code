const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    let sum = 0;

    data.split(',').forEach((IDPair, index) => {

        const [startID, endID] = IDPair.trim().split('-').map(Number);

        for(let currentID = startID; currentID <= endID; currentID++){
            
            // variables
            const currentIdString = currentID.toString();
            const currentMid = currentID.toString().length/2;

            // filter even numbers
            if(currentIdString.length % 2 === 0){
                // compare the strings
                const subA = currentIdString.substring(0, currentMid);
                const subB = currentIdString.substring(currentMid);

                if(subA === subB){
                    sum += parseInt(currentIdString);
                }
            }      
        }
    });
    console.log(sum);
});