const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const maps = [[], []];

    // store in arrays
    data.trim()
        .split('\n')
        .map(l => {
        l.split("   ")
            .map((v, i) => {
            maps[i].push(parseInt(v));
            });
        });

    // alternative version to store in objects
    //    if(!maps[i][v]) maps[i][v] = 1;
    //         else maps[i][v] += 1;
    //         maps[i].colSum ++;
    
    // order
    maps.forEach(m => m.sort());                       
    
    // calculate distances
    const distances = [];

    maps[0].forEach((val, index) => {
        distances[index] = Math.abs(maps[0][index] - maps[1][index])
    })

    const sum = distances.reduce((acc, cur) => acc + cur, 0);

    console.log(maps, distances, sum)

});