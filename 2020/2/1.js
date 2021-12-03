const fs = require('fs');

//handler for nb of valid password
let validPassword = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {
  // split par retour à la ligne
  data = data.split('\n');


  for(const el of data){
    // every data in a var to compare later
    let minVal = el.split('-')[0];
    let maxVal = el.split(' ')[0].split('-')[1];
    let letterIWant = el.split(' ')[1].split(':')[0];
    let password = el.split(': ')[1];
    //console.log(minVal, maxVal, letterIWant, password);

    //split every password character
    const splitedPassword = password.split('');
    //console.log(splitedPassword);

    //filter with the letterIWant
    const i = splitedPassword.filter(s => s === letterIWant).length;
    
    //verify if it match with min and max
    if(i >= minVal && i <= maxVal){
      validPassword += 1;
    }
    console.log(validPassword);
  }
  

});