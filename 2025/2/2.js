const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const checkPatterns = (type, IDString) => {
        for(let i = 1; i <= IDString.length/type; i++){
            // on vérifie que c'est divisible, qu'il n'y aura pas de reste (nombre pas checké)
            if (IDString.length % i !== 0) continue;


            // je découpe mon pattern du plus petit au plus grand
            const isThisAPattern = IDString.slice(0, i);

            // nombre max où je dois checker la répétion
            const numMaxPatternRepeat = IDString.length / i;

            // si il se répète tout pile comme la longueur de mon string
            if (isThisAPattern.repeat(numMaxPatternRepeat) === IDString) {
                sum += parseInt(IDString);
                sumDebug.push(parseInt(IDString));
                break;
            }
        }
    }

    let sum = 0;
    let sumDebug = [];

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
                    sumDebug.push(parseInt(currentIdString));
                    continue; // avoid repetitions "222222" fits here and when searching for 2*3 patterns
                }

                

                // if even check XYXYXY patterns
                checkPatterns(3,currentIdString);
                

            }else{
                checkPatterns(2,currentIdString);
                
            } 
        }
    });
    console.log(sum, sumDebug);

    const sumA = sumDebug.reduce((a,b)=>a+b)
console.log(sumA);
});