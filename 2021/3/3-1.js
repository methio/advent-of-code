const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;

  // split par retour à la ligne
  data = data.split('\n');

  // ########  GAMMA and EPSYLON  ##########
  // create arrays to store informations 
  let linesLength = data[0].length;
  let gammaBits = [];
  let epsylonBits = [];
  for(let i = 0; i < linesLength; i++){
    gammaBits.push(0);
    epsylonBits.push(0);
  }
    
  // forEach char of each line, increment a var if value is 1
  data.forEach((el) => {
    for (let p = 0; p <= el.length; p++) {
      if(el.charAt(p) === "1"){
        gammaBits[p]+=1;
        epsylonBits[p]+=1;
      }
    }
  });

  let mid = parseInt(data.length/2);
  // for each entry of the array. If number of 1 is > total of lines / 2. Then, line = 1 to translate in gamma way
  gammaBits.forEach((el, index, array) => {
     el > mid ? array[index] = 1 : array[index] = 0; // ternaire -> condition ? if true : if false
  });
  // for each entry of the array. If number of 1 is < total of lines / 2. Then, line = 1 to translate in espylon way
  epsylonBits.forEach((el, index, array) => {
    el < mid ? array[index] = 1 : array[index] = 0; // ternaire -> condition ? if true : if false
 });


  //console.log(gammaBits);
  //console.log(epsylonBits);

  let gamma = parseInt(Number(gammaBits.join('')), 2); // array to string -> to number -> parse to translate binary to decimal
  let epsylon = parseInt(Number(epsylonBits.join('')), 2); 

  let result = gamma * epsylon; 

  console.log("gamma is : " + gamma + ". Espylon is : " + epsylon + ". Result is " + result);
});