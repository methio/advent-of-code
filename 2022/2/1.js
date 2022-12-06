const fs = require('fs');
console.clear();

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let rounds = data.split('\n');

  let myScore = 0;

  rounds.forEach((round, index) => {
    let [elve, me] = round.split(' ');      // destructuring each row 

    /*
    Elve                Me              points          
    A - Rock            X - Rock        --  1           
    B - Paper           Y - Paper       --  2
    C - Scissors        Z - Scissors    --  3
                                            +3 equality
                                            +6 win
    */
    if (me === "X"){
        myScore += 1;

        if(elve === "A"){
            myScore += 3;
        }else if(elve === "C"){
            myScore += 6;
        }
    }else if (me === "Y"){
        myScore += 2;

        if(elve === "B"){
            myScore += 3;
        }else if(elve === "A"){
            myScore += 6;
        }
    }else if (me === "Z"){
        myScore += 3;

        if(elve === "C"){
            myScore += 3;
        }else if(elve === "B"){
            myScore += 6;
        }
    }
    console.log(myScore, index);
  })
  


  
});