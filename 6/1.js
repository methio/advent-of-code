const fs = require('fs');

fs.readFile('input.txt', 'utf8', (e, data) => {
  //console.log(data);

  //set up data
  const byGroup = data
                    .split('\n\n')
                    .map(m=> m
                            .split('\n')
                            .join('')
                            .split('')
                    );
  
  //Remove duplicate elements from the array and push 
  const okByGroup = [];
  for(let items of byGroup){
    items = [...new Set(items)].length;    
    okByGroup.push(items);    
  }

  //sum every group answer
  const total = okByGroup.reduce((acc, curr) => acc + curr)

  console.log(total);
})