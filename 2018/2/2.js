const fs = require("fs");

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    let ids = data.split('\n')
                  .map(i => i.split(''));

    // console.log(ids);

    const getDifferences = (ref, test) => {
        return ref.filter(x => !test.includes(x));
    }

    const getCommon = (ref, test) => {
        return ref.filter(x => test.includes(x));
    }

    const howManyDiffs = (ref, test) => {
        let diffs = 0;        
        for (let i = 0; i < ref.length; i++) {
            if (ref[i] !== test[i]) {
                diffs++;
             }
        }
        return diffs;
    }

    ids.forEach(ref => {
        // on regarde tous les autres ids et on calcule le nombre de difference. 
        // Si 1 diff alors c'est bon, retourne le string - le caractère différent

        ids.forEach(test => {
            // const common = getCommon(ref, test);
            // const diff = getDifferences(ref, test);

            const h = howManyDiffs(ref, test);
            if(h == 1){
                const common = getCommon(ref, test);
                const diff = getDifferences(ref, test);

                console.log("c'est lui", ref.join(''), test.join(''), common.join(''), diff)
            }
        });



    });


});