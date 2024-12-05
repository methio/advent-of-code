const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const maps = [[], {}];

    // store in array and object
    data.trim()
        .split('\n')
        .map(l => {
        l.split("   ")
            .map((v, i) => {
                if(i%2===0){
                    maps[0].push(parseInt(v));
                }else{
                    if(!maps[1][v]) maps[1][v] = 1;
                    else maps[1][v] += 1;
                }
            });
        });
                  
    
    // calculate distances
    const similarityScore = [];

    maps[0].forEach((val, index) => {
        const multiplier = isNaN(maps[1][val]) ? 0 : maps[1][val];
        similarityScore[index] = Math.abs(maps[0][index] * multiplier)
    })

    const sum = similarityScore.reduce((acc, cur) => acc + cur, 0);

    console.log(sum); //maps, similarityScore, 

});