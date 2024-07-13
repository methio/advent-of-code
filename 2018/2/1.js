const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    let ids = data.split('\n')
                  .map(i => i.split(''));

    /* ------ */
    const sortLetters = (id) => {
        return [...id].sort((a,b) => a.localeCompare(b));
    }
    const findDuplicates = (id) => {
        return [...id].filter((item, index) => id.indexOf(item) !== index);
    }
    const isOdd = (n) => {
        return Math.abs(n % 2) == 1;
    }

    const occurences = (arr) => {
        let o = {};
        arr.forEach((x)=>o[x] = (o[x] || 0) + 1);
        return o;
    }


    let two = 0;
    let isTwo = false;
    let three = 0;
    let isThree = false;

    let counter = [];

    ids.forEach((id, index) => {
        counter.push(occurences(id));

        if(Object.values(counter[index]).some(item => item === 2)) two++;
        if(Object.values(counter[index]).some(item => item === 3)) three++;


                
        
        // for(var i=0; i<arr.length; ++i) if(arr[i] === val) ++count;


        // // const orderedId = sortLettersFromId(id);
        // let duplicates = sortLetters(findDuplicates(id));
       
        // const isThree = findDuplicates(duplicates).length > 0 ? true : false;
        // if(isThree)three++;

        // const doubleIsOdd = isOdd(duplicates.length);
        // const isDouble = doubleIsOdd || (!doubleIsOdd && !isThree && duplicates.length>0);
        // if(isDouble)two++;

        // console.log(isDouble, isThree, duplicates);
    });

    // console.log(counter);
    console.log(`two: ${two} * three: ${three} = ${two * three}`);
});