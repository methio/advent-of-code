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
                if(!fabric[x][y]) fabric[x][y] = {ov: 0, who:[]}; // crée la cellule
                fabric[x][y].ov +=1;
                fabric[x][y].who.push(claim.id);
            }
        }
    });

    claims.forEach(claim => {

        let noOverlap = true;

        // on parcourt le claim. si il y a un overlap, bye
        for(let y = claim.posY; y < claim.posY + claim.sizeY; y++){
            for(let x = claim.posX; x < claim.posX + claim.sizeX; x++){
                // si ligne superpose, bye
                if(fabric[x][y].ov > 1){
                    noOverlap = false;
                    break;
                }
            }
            // si la ligner superpose, bye c'est pas le bon
            if(!noOverlap) break;
        }

        // si il a pas d'overlap c'est bon
        if(noOverlap) console.log(claim) 
    });
});