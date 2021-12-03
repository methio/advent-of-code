const fs = require('fs');

let result = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {

  if(err) throw err;

  // Keep integer only
  data = data.split('\n').map(d => parseInt(d));

  for(let i = 0; i < data.length; i++){

    // Do not get undefined values
    let p1 = data[i - 1];
    let p2 = data[i - 2];
    let p3 = data[i - 3];

    if (typeof p1 !== "undefined" && typeof p2 !== "undefined" && typeof p3 !== "undefined"){     

      // Get variables to compare    
      let currentVal = data[i] + p1 + p2;
      let previousVal = p1 + p2 + p3;

      //console.log(currentVal + " <-- current | previous --> " + previousVal);

      // Compare and increase result
      if(currentVal > previousVal){
        result++;
      }
    }
  }
  console.log(result);
});