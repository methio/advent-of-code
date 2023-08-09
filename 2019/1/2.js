const fs = require('fs');

console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if(err) throw err;

  const modules = data.split('\n')

  const getFuel = (num) => {
    return Math.floor(num/3) - 2;
  }

  let sum = 0;

  modules.forEach(module => {

    module = parseInt(module);
    let updatedMass = getFuel(module);

    while(updatedMass > 0){
      sum += updatedMass;
      updatedMass = getFuel(updatedMass);
    }
  });


  console.log(modules.length, sum)


});