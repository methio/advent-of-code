const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const getErrors = (level=[5, 4, 3, 2, 1]) => {
        let errors = {
            sum: 0,
            motifs: []
        };
        let direction = "";

        for(let i = 0; i < level.length - 1; i++){
            const c = level[i];
            const n = level[i+1];

            // check gap
            const gap = Math.abs(c - n);
            if(gap === 0){
                errors.sum += 1;
                errors.motifs.push(`no gap → [${c} ${n}]`)            
            }
            if(gap > 3){
                errors.sum += 1;
                errors.motifs.push(`gap too big → [${c} ${n}]`)
            }

            // check if no direction
            // if(c - n === 0){
            //     errors.sum += 1;
            //     errors.motifs.push(`doesnt increase or decrease → [${c} ${n}]`)
            // }

            // set direction
            if(i === 0){
                if(c > n) direction = "👇🏻";
                else if(c < n) direction = "👆🏻";
            }else{
                if(c < n && direction === "👇🏻"){
                    errors.sum += 1;
                    errors.motifs.push(`should decrease but increase instead → [${c} ${n}] ${level}`)
                }else if( c > n && direction === "👆🏻"){
                    errors.sum += 1;
                    errors.motifs.push(`should increase but decrease instead → [${c} ${n}] ${level}`)
                }
            }
        }
        return errors;
    }
    
    let safe = 0;
    data.split('\n').map(line => {
        const level = line.split(' ').map(value => parseInt(value));
        const currentLevelReport = getErrors(level);
        // console.log(currentLevelReport)

        // first round
        if(currentLevelReport.sum === 0) safe++;
        else{
            // second round by removing one item from level
            for (let i = 0; i < level.length; i += 1) {
                const modifiedLevel = [...level].filter((val, index) => index !== i); // try remove current level[i]
                if (getErrors(modifiedLevel).sum === 0) {
                  safe ++;
                  break; // jump to next level
                }
              }            
        }
    });

    console.log(safe)


});