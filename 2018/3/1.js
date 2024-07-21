const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const claims = [];
    data = data.split('\n')
                .map(i => i.trim())
                .map(i => {
                    const id = parseInt(i.substring(i.indexOf("#")+1, i.indexOf("@")-1));
                    const posX = parseInt(i.substring(i.indexOf("@")+2, i.indexOf(",")));
                    const posY = parseInt(i.substring(i.indexOf(",")+1, i.indexOf(":")));
                    const sizeX = parseInt(i.substring(i.indexOf(":")+2, i.indexOf("x")));
                    const sizeY = parseInt(i.substring(i.indexOf("x")+1));

                    claims.push({id, posX, posY, sizeX, sizeY});
                });
    

    const fabric = [];

    // option on créé toutes les cases -> trop lourd
    // const size = 1000;
    // for(let y = 0; y<=size; y++){
    //     for(let x = 0; x<=size; x++){
    //         fabric.push({
    //             posX: x,
    //             posY: y,
    //             overlap: 0,
    //             who: []
    //         })
    //     }
    // }

    // console.log(claims, fabric);

    // claims.forEach(claim => {
    //     for(let y = 0; y<claim.sizeY; y++){
    //         for(let x = 0; x<claim.sizeX; x++){
    //             let currentSquare = fabric.findIndex(square => square.posX === claim.posX + x && square.posY === claim.posY + y);
    //             // console.log(currentSquare, fabric[currentSquare], claim)
    //             fabric[currentSquare].overlap++;
    //             fabric[currentSquare].who.push(claim.id);
    //         }
    //     }
    // });

    // const overlappingSquares = [];
    // fabric.forEach(square => {
    //     if(square.overlap >= 2){
    //         overlappingSquares.push(square)
    //     }
    // });

    // on créé uniquement les cellules dont on a besoin + on garde l'info : nbr de superpositions
    claims.forEach(claim => {
        for(let y = claim.posY; y < claim.posY + claim.sizeY; y++){
            for(let x = claim.posX; x < claim.posX + claim.sizeX; x++){
                if(!fabric[x]) fabric[x] = []; // crée la ligne
                if(!fabric[x][y]) fabric[x][y] = 0; // crée la colonne
                fabric[x][y]++;
            }
        }
    });

    let overlappingSquares = 0;
    fabric.forEach( row => {
        if(!row) return;
        row.forEach( cellule => {
            if(cellule > 1) overlappingSquares++;
        })
    })
    
    console.log(overlappingSquares)


    

});