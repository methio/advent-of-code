const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    const fd = data.split('\n').map(l => l.split(' ').map(i => parseInt(i)));

    const isSafe = (level=[5, 4, 3, 2, 1]) => {
        if(hasNoGap(level)){
            if(isIncreasing(level)){
                return true;
            }
            if(isDeacreasing(level)){
                return true;
            }
        }
        return false;
    }
    const hasNoGap = (level) => {
        for(let i = 0; i < level.length-1; i++){
            const current = Math.abs(level[i] - level[i+1]);
            const currentHasNoGap = current >= 1 && current <= 3
            console.log(current, currentHasNoGap)
            if(!currentHasNoGap){
                return false;
            }
        }
        return true;
    }
    const isIncreasing = (level) => {
        for(let i = 0; i < level.length-1; i++){
            if(level[i] > level[i+1]){
                return false;
            }
        }
        return true;
    }
    const isDeacreasing = (level) => {
        for(let i = 0; i < level.length-1; i++){
            if(level[i] < level[i+1]){
                return false;
            }
        }
        return true;
    }

    let sumSafe = 0;
    fd.forEach((val, ind) => {
        if(isSafe(val))sumSafe++;
    })
    console.log(sumSafe);

});