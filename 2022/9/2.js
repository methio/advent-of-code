const fs = require('fs');
const _ = require('lodash');
console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;
    
    let moves = data.split('\n');
    moves.forEach((el, index) => {
        moves[index] = el.split(' ');
        moves[index][1] = parseInt(moves[index][1]);
    });

    const knots = [];
    for(let i = 0; i <= 9; i++){
        knots.push({x: 0, y: 0});
    }
    let visitedLocationByKnot9 = [];

    // now move
    moves.forEach((move, ind) => {
        const [direction, amount] = move;

        for(let i = 1; i <= amount; i++){
            knots.forEach((knot, index) => {
                
                if(index === 0){                    
                    moveOnce(direction, knot);
                }else{                    
                    if(isNotAroundPreviousKnot(knots[index - 1], knot)){
                        const nearestPoint = findNearestPoint(knots[index - 1], knot);
                        knots[index] = nearestPoint;
                    }

                    if(index === 9){
                        const tailClone = {...knots[index]};    
                        visitedLocationByKnot9.push(tailClone);
                    }
                }
            });
        }        
    });

    // console.log(visitedLocationByKnot9.length);
    // console.log(visitedLocationByKnot9);
    let noDoublonArray = removeDuplicates(visitedLocationByKnot9);
    // console.log(noDoublonArray.length);
    // console.log(noDoublonArray);
});


// ------------------- functions -------------------

const isNotAroundPreviousKnot = (head, tail) => {
    let pointsAroundH = [];
    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
            pointsAroundH.push({
                x: head.x + dx, 
                y: head.y + dy
            });
        }
    }
    return pointsAroundH.every((e) => Object.entries(e).toString() !== Object.entries(tail).toString());
};

const removeDuplicates = (arr) => {
    jsonObject = arr.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArray;
};

const findNearestPoint = (head, tail) => {
    let headAnchors = [
        {x: head.x - 1, y: head.y},
        {x: head.x + 1, y: head.y},
        {x: head.x, y: head.y - 1},
        {x: head.x, y: head.y + 1},
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
        case 'U': who.y ++; break;
        case 'R': who.x ++; break;
        case 'D': who.y --; break;
        case 'L': who.x --; break;
        default: console.log(`'${dir}' n'est pas une valeur valable`)
    }
};