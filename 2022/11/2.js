const fs = require('fs');
const _ = require('lodash');
console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.split('\n\n');
    const monkeys = data.map(monkey => {
        monkey = monkey.split('\n');

        let items = monkey[1].substring(18, monkey[1].length);
        items = items.split(', ')
                     .map(item=>parseInt(item));

        let operation = monkey[2].substring(23, monkey[2].length);
        operation = operation.split(' ');

        const monkeyData = {
            id: monkey[0].charAt(7), 
            items: items,
            totalItemsInspected: 0,
            operation: {signe: operation[0], value: operation[1]},
            test:  parseInt(monkey[3].substring(21, monkey[3].length)),
            true:  parseInt(monkey[4].substring(29, monkey[4].length)),
            false: parseInt(monkey[5].substring(30, monkey[5].length))            
        }
        return monkeyData;
    });

    const rtp = [1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

    for(let i = 1; i <= 10000; i+=1){
        if(rtp.includes(i))console.log(`\n### ROUND ${i} ###`);
        for(let [index, monkey] of monkeys.entries()){
            
            const nbItems = monkey.items.length;
            for(let i = 1; i <= nbItems; i++){
                let itemToInspect = monkeys[index].items.shift();
                // let old = itemToInspect;
                // console.log(monkey.operation.value);
                let res;
                if(monkey.operation.value === 'old'){
                    res = eval(itemToInspect + `${monkey.operation.signe}` + itemToInspect);
                }else {
                    res = eval(itemToInspect + `${monkey.operation.signe}` + monkey.operation.value);
                }
                // res = Math.floor(res/3);
                if(res % monkey.test === 0) monkeys[monkey.true].items.push(res);
                else monkeys[monkey.false].items.push(res); 
                monkeys[index].totalItemsInspected += 1;

            }
            if(rtp.includes(i))console.log(`Monkey ${index} inspected items ${monkeys[index].totalItemsInspected} times.`)
            
            
        }

       
    }
    
    let monkeysTotal = [];
    monkeys.forEach(monkey => monkeysTotal.push(monkey.totalItemsInspected));
    monkeysTotal = monkeysTotal.sort((a, b) => b - a);
    const [highest, second, ...lesNullos] = monkeysTotal;
    console.log(highest*second)  
});