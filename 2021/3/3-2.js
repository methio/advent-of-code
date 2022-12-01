const fs = require('fs');
const { clear, log } = require('console');
clear();
log('/'.repeat(100));

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;    
    data = data.split('\n').filter(d => d); // split on each line and remove empty entries
   
     // utilities
    let mid = parseInt(data.length/2);

    // variables 
    let oxy = [...data]; //duplicate data array to later remove some entries
    let co2 = [...data];
    let Tot1Bits = new Array(data[0].length).fill(0); //array to check Bit. create array with one line length as argument, then fill each value with 0

    oxy.forEach((el) => {
        for (let p = 0; p < el.length; p++) {
            //extra rule 
            if(p == el.length - 1){Tot1Bits[p]+=1;}
            if(el.charAt(p) === "1"){
                Tot1Bits[p]+=1;
            }
          }
    });

    // Oxygen
    for (let p = 0; p < Tot1Bits.length; p++) {
        let checker = oxy.length;
        oxy.map((value, index) => {
            oxy.some((element) => {if(element === undefined){checker--;}});

            if(checker > 1){
                if (Tot1Bits[p] < mid && value.charAt(p) == "1"){
                    delete oxy[index];
                }else if(Tot1Bits[p] > mid && value.charAt(p) == "0"){
                    delete oxy[index]; // on delete pour ne pas modifier les positions des entrées, mais juste supprimer la valeur
                }
            }
        });
        oxy = oxy.filter(el => el); // à la fin on filtre en enlevant les entrées vides      
    }
    log("remaining value in oxy : " + oxy);

    // C02
    
    for (let p = 0; p < Tot1Bits.length; p++) {
        let checker = co2.length;
        co2.map((value, index) => {
            co2.some((element) => {if(element === undefined){checker--;}});

            if(checker > 1){
                if (Tot1Bits[p] > mid && value.charAt(p) == "1"){
                    delete co2[index];
                }else if(Tot1Bits[p] < mid && value.charAt(p) == "0"){
                    delete co2[index]; // on delete pour ne pas modifier les positions des entrées, mais juste supprimer la valeur
                }
            }
            
            
            
        });
        co2 = co2.filter(el => el); // à la fin on filtre en enlevant les entrées vides        
    }
    log("remaining value in co2 : " + co2);

let oxygen = parseInt(Number(oxy.join('')), 2);
let CO2Scrubber = parseInt(Number(co2.join('')), 2);  
log("oxygen final val is " + oxygen + " and CO2 final val is " + CO2Scrubber + ". Multiplication give " + (oxygen*CO2Scrubber));
    
});