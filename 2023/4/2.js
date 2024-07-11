const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
if (err) throw err;

const cards = data.split('\n')
                .map(e => {
                    
                    const cardId = parseInt(e.substring(e.indexOf(':') - 3, e.indexOf(':')).trim());
                    const [winning, deck] = e.slice(e.indexOf(':') + 1)
                                            .trim()
                                            .split(' | ')
                                            .map(el => [...el.matchAll(/\d+/g)].map(ele => parseInt(ele))
                                            );

                    const winningFromDeck = winning.filter(w => deck.includes(w));
                    const wonCards = winningFromDeck.map((card, ind) => cardId + ind + 1); // start : id de la carte + index qu'on incremente + 1 de décalage
                    // console.log(cardId, wonCards)
                    return {cardId, wonCards, cardCopies: 1};               
                });

const updateCardCopiesCount = (id) => {
    cards[id - 1].wonCards.forEach(e => {
        cards[e - 1].cardCopies+=1;
        updateCardCopiesCount(e);
    });
};

cards.forEach(card => {
    updateCardCopiesCount(card.cardId);
});

// console.log(cards);

const sum = cards.reduce((a, b) => a + b.cardCopies, 0);
console.log(sum);

});