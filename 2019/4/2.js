const fs = require('fs');

fs.readFile('test.txt', 'utf8', (err, data) => {
    if(err) throw err;

    //256310-732736

    const start = parseInt(data.split('-')[0]);
    let nt = start;
    const end = parseInt(data.split('-')[1]);
    const possibilities = [];

    const isIncreasing = num => {
        return num.charAt(0) <= num.charAt(1) && num.charAt(1) <= num.charAt(2) && num.charAt(2) <= num.charAt(3) && num.charAt(3) <= num.charAt(4) && num.charAt(4) <= num.charAt(5)
    }

    // const isAdjacent = num => {
    //     for(let i = 0; i < num; i++){
    //         if(num.charAt(i) === num.charAt(i+1)){
    //             return parseInt(i);
    //         }
    //     }
    // }

    // const isTriplet = (num, adj) => {
    //     const reg = new RegExp(/(?:.*?\1){3,}/);
    //     return reg.test(num);
    // }

    const removeDuplicates = (arr) => {
        const setDouble = new Set();
        arr.map(d => setDouble.add(d[1]))
        return Array.from(setDouble);
    }

    const checkString = (str) => {
        
        const doubleCharReg = /(\d)\1/g;
        const tripleCharReg = /(\d)\1{2,}/g;
        
        // get double 
        const matchAllDouble = [...str.matchAll(doubleCharReg)];
        // remove duplicates
        const arrayDouble = removeDuplicates(matchAllDouble);

        if(arrayDouble.length > 0){ 

            const matchAllTriple = [...str.matchAll(tripleCharReg)];
            const arrayTriple = removeDuplicates(matchAllTriple);
            
            if(arrayTriple.length > 0) {
                if(arrayDouble.length > 1){
                    // au moins deux paires et un triple ->juste
                    // on vérifie que ce soit pas deux triples
                    const dt = arrayDouble.filter(val => !arrayTriple.includes(val));
                    // console.log(arrayTriple, arrayDouble, dt)
                    if(dt.length > 0) return true;    
                } else {
                    // que un triple -> faux
                    return false;
                }
            } else if(matchAllTriple.length < 1 && arrayDouble.length > 0){
                // plusieurs paires
                return true;
            }            
        }
        return false; // pas de paire
    }

//     const s = "333888"
//    console.log(checkString(s), s)

    while(nt <= end){
        
        if(isIncreasing(nt.toString())){
            if(checkString(nt.toString())){
                possibilities.push(nt);                    
            }
        }
        nt++;
    }

    console.log(possibilities, possibilities.length);


});