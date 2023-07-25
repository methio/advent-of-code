const fs = require('fs');
const _ = require('lodash');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    // parse input
    data = data.split('\n');
    data.forEach((el, index) => {
        data[index] = el.split(' ');
        data[index][1] = parseInt(data[index][1]);
    });

    // instantiate head and tail
    let head = {x: 0,y: 0};
    let tail = {x: 0,y: 0};
    let visitedLocation = [];

    // now move
    data.forEach((move, index) => {
        const [direction, amount] = move;
        
        for(let i = 1; i <= amount; i++){

            // console.log(`start -- head : ${head.x}-${head.y} | tail : ${tail.x}-${tail.y}`);

            // moving head
            moveOnce(direction, head);

            
            // moving tail
            let pointsAroundH = [];
            for (let dx = -1; dx < 2; dx++) {
                for (let dy = -1; dy < 2; dy++) {
                    // if (tail.x !== 0 && tail.y !== 0) {
                        pointsAroundH.push({
                            x: head.x + dx, 
                            y: head.y + dy
                        });
                    // }
                }
            }

            const TailNotAroundHead = pointsAroundH.every((e) => Object.entries(e).toString() !== Object.entries(tail).toString());
            const isInLine = head.x === tail.x || head.y === tail.y;

            if(TailNotAroundHead){             // si pas autour 
                if(isInLine){                   // si en ligne
                    moveOnce(direction, tail);

                }else{                          // si pas en ligne 
                    const nearestPoint = findNearestPoint(head, tail);
                    tail = nearestPoint;
                }
            }  

            const tailClone = {...tail}; // spread operator = avoid bug (update i - 1 object)
            visitedLocation.push(tailClone);            
        }        
    });

    // console.log(visitedLocation.length);
    // console.log(visitedLocation);
    let noDoublonArray = removeDuplicates(visitedLocation);
    // console.log(noDoublonArray.length);
    // console.log(noDoublonArray);
});


// ------------------- functions -------------------

const removeDuplicates = (arr) => {

    jsonObject = arr.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    return uniqueArray;
};

const findNearestPoint = (head, tail) => {
    let headAnchors = [
        {x: head.x - 1,
        y: head.y},
        {x: head.x + 1,
        y: head.y},
        {x: head.x,
        y: head.y - 1},
        {x: head.x,
        y: head.y + 1},
    ];
    let min_distance = Number.POSITIVE_INFINITY;
    let neareastPoint;
    
    headAnchors.forEach(position => {
        const positionDistance = Math.sqrt((position.x - tail.x) ** 2 + (position.y - tail.y) ** 2);
        if (positionDistance < min_distance){
            min_distance = positionDistance;
            neareastPoint = position;
        }
    });
    return neareastPoint;
};

const moveOnce = (dir, who) => {
    switch (dir) {
        case 'U':
            who.y ++;
            break;
        case 'R':
            who.x ++;
            break;
        case 'D':
            who.y --;
            break;
        case 'L':
            who.x --;
            break;
        default: 
            console.log(`'${dir}' n'est pas une valeur valable`)
    }
    // return who;
};