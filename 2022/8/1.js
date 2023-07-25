const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.split('\n')
               .map(n=>n.split(''));

    // console.log(data);

    const checkDirection = (posX, posY) => {

        const currentTree = data[posY][posX];
        const trees = [];

        //to right
        const treesR = [];
        for(let n = posX+1; n < data.length; n++){
            treesR.push(data[posY][n]);            
        }
        //to down
        const treesD = [];
        for(let n = posY+1; n < data[posX].length; n++){
            treesD.push(data[n][posX]);            
        }
        //to left
        const treesL = [];
        for(let n = posX-1; n >= 0; n--){
            treesL.push(data[posY][n]);            
        }
        //to up
        const treesU = [];
        for(let n = posY-1; n >= 0; n--){
            treesU.push(data[n][posX]);            
        }

        trees.push(treesR, treesD, treesL, treesU);

        const res = trees.some(tree => tree.every(t => t < currentTree));

        // console.log(currentTree, res, trees);


        return res
    }


    let totalVisible = 0; 

    for(let y = 1; y < data.length - 1; y++){
        for(let x = 1; x < data[0].length - 1; x++){

            // console.log(`position x:${x} - y:${y} | cell val:${data[y][x]}`);
           if(checkDirection(x, y)) totalVisible++;

        }
    }

    const bordure = (data.length*2) + ((data.length*2) - 4);

    console.log("total est", totalVisible, bordure, totalVisible+bordure);
});

