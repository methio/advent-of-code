const fs = require('fs');

//handler for nb of valid password
let validPassword = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {
  // split par retour à la ligne
  data = data.split('\n');


  for(const el of data){
    // every data in a var to compare later
    let firstVal = parseInt(el.split('-')[0]);
    let secondVal = parseInt(el.split(' ')[0].split('-')[1]);
    let letterIWant = el.split(' ')[1].split(':')[0];
    let password = el.split(': ')[1];
    //console.log(firstVal, secondVal);

    //verify if it match with min and max
    if((password.split('')[firstVal - 1] === letterIWant) != (password.split('')[secondVal - 1] === letterIWant)){
      validPassword += 1;
      console.log(el + " ok");
    }

    console.log(validPassword);
  }
});