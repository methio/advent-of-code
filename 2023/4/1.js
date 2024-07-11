const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
if (err) throw err;

const sum = data.split('\n')
                .map(e => {
                
                    const [winning, deck] = e.slice(e.indexOf(':') + 1)
                                            .trim()
                                            .split(' | ')
                                            .map(el => [...el.matchAll(/\d+/g)].map(ele => parseInt(ele))
                                            );

                    const winningFromDeck = winning.filter(w => deck.includes(w));
                    const points = winningFromDeck.length ? Math.pow(2, winningFromDeck.length - 1) : 0; // ressource - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
                    // console.log(winning, deck, winningFromDeck, points)
                    return {points};               
                })
                .reduce((a,b) => a + b.points, 0);

console.log(sum);


// ###### RECHERCHE 1 PAS OPTI
// const res = [];

// cards.forEach(card => {
//     const current = [];
//     card[0].forEach(winning => {
//         if(card[1].includes(winning)){
//             current.push(1);
//         }
//     });
//     if(current.length > 0){
//         res.push(current.reduce((a,b) => a + b, 0));
//     }
// });

// console.log(res);

});