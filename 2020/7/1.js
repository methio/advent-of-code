const fs = require('fs');

console.clear();
console.log('---------------------------');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if(err) throw err;


  // const bags = data.split('\n').map(bag => {
  //   const contain = bag.split('contain ')[1].split(", ");
  //   return {
  //     color: bag.split(' bags ')[0],
  //     items: contain.map(c=> c = c.split(/ (.*)/)[1].replace(/\s(bag)s*\.*$/,'')) //full infos in objcets {quantity:c.split(/ (.*)/)[0], type:c.split(/ (.*)/)[1].replace(/\s(bag)s*\.*$/,'')}
  //    Pas besoin d'qller aussi loin dans le parse, car je peux faire includes sur la string complète
  //    }
  // })

  const bags = data.split('\n').map(bag => {
      return {
        color: bag.split(' bags contain ')[0],
        content: bag.split(' bags contain ')[1]
      }
    })
  const bts = 'shiny gold';
  
  
  const possibilities = new Set(); // store only unique values
  const bagFinder = colorToSearch  => {
    bags.filter(bag => bag.content.includes(colorToSearch))
        .forEach( bagFound => {
          console.log(bagFound.color)
          possibilities.add(bagFound.color); //add new different value to our Set 
          bagFinder(bagFound.color); //search again with this value
        })
  }

  bagFinder(bts)

  console.log(possibilities.size)


// test zone
  // const obts = []
  // let num = 0;
  // bags.map(b => {
  //   if(b.items.includes(bts)){
  //     obts.push(b.color);
  //     num++;
  //   }
  // })

  // console.log(obts)


  // bags.forEach(b => {

  //   //si b.items contient un des obts alors num ++ 

  //   let same = b.items.some(item => obts.includes(item))
  //   if(same)num++
  //   // console.log(same)
  // })  
});