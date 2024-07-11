const fs = require("fs");
const _ = require('lodash');

fs.readFile("test.txt", "utf8", (err, data) => {
if (err) throw err;

    const cardsPower = "AKQJT98765432".split('');
    const rcp = cardsPower.reverse();  

    const getPowerness = (chs) => {
        const l = chs.length;
        if(l==5)return 0; // is a highCard
        if(l==4)return 1; // is a pair
        if(l==3 && chs[0][1] == 2) return 2; // is 2 pairs
        if(l==3 && chs[0][1] == 3) return 3; // is 3 of a kind
        if(l==2 && chs[0][1] == 3) return 4; // is a full
        if(l==2 && chs[0][1] == 4) return 5; // is 4 of a kind
        if(l==1) return 6; // is 5 of a kind
    }

    const sortedHands = Array(7).fill([]);
    const hands = data
                    .split('\n')
                    .map(e=>{
                        const [hand, bid] = e.split(' ');
                        const orderedHand = hand.split('').sort((a, b)=>cardsPower.indexOf(a) - cardsPower.indexOf(b)).join('');
                        const counterHand = _.countBy(orderedHand.split('')); //went with loadash because reduce c'est nul .reduce((prev, curr) => ({...prev,[curr]: 1 + (prev[curr] || 0)}));
                        const counterHandSorted = Object.entries(counterHand).sort((a,b)=>b[1] - a[1]);
                        const powerness = getPowerness(counterHandSorted);
                        return{
                            oh: orderedHand,
                            // counterHand,
                            chs: counterHandSorted,
                            pn: powerness,
                            bid:parseInt(bid)
                        }
                    })
                    .map(f=>sortedHands[f.pn].push(f))


console.log(sortedHands);
// const handsByPowerness = [];

//     hands.forEach((hand,index)=>{
        
//     });


});

// le repère des regex
// powerness == 5same - 4same - full - 3same - 2pairs - 1pair - highCard
// const fiveSame  = (c) => /([AKQJT98765432]).*\1{4}/.test(c);
// const fourSame  = (c) => /([AKQJT98765432]).*\1{3}/.test(c);
// const full = (c) => /([AKQJT98765432]).{0,1}\1([AKQJT98765432]).{0,1}\2/.test(c);
// const threeSame = (c) => /([AKQJT98765432]).*\1{2}/.test(c);
// const twoPairs = (c) => /([AKQJT98765432]).{0}\1([AKQJT98765432]).{0}\2/.test(c);
// const pair = (c) => /([AKQJT98765432]).{0}\1/.test(c);
// highCard = hand[0] <- get highest (index 0)