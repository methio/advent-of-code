const fs = require('fs');

let arrayOfSeats = [];

fs.readFile('input.txt', 'utf8', (e, data) => {
  data = data.split('\n');
  
  for(const siege of data){

    //parse data with row and col
    let [row, col] = [siege.substring(0, 7), siege.substring(7, 10)];

    //set binary number
    row = row.replace(/B/g,"1").replace(/F/g,"0");
    col = col.replace(/R/g,"1").replace(/L/g,"0");

    //then parse to int number
    [row, col] = [parseInt(row, 2), parseInt(col, 2)];

    const idOfSeat = (row * 8) + col;

    arrayOfSeats.push(idOfSeat);
    //console.log(idOfSeat);  

  }
  console.log("the array : " + arrayOfSeats);
  const HighestSeatId = Math.max(...arrayOfSeats);
  console.log(" the highest : " + HighestSeatId);
})