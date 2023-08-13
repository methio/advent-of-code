const fs = require('fs');
const path = require('path');

console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if(err) throw err;

  const paths = data.split('\n')
                    .map(n => n.split(','));

  // const paths = [["R1","U1","L1"],["U2"]];
  // console.log(paths)

  const cells = [{x:0,y:0}];
  const sCells = [];

  paths.forEach((path, pathIndex) => {
    let x = 0;
    let y = 0;

    path.forEach(infos => {     
      let dir = infos.charAt(0); 
      let amount = parseInt(infos.substring(1, infos.length));
      
      for(let i = 1; i <= amount; i+=1){

        if(dir === 'R') x ++;
        if(dir === 'D') y --;
        if(dir === 'L') x --;
        if(dir === 'U') y ++;
        
        if(pathIndex > 0){
          const cell = cells.find(c => {
            // console.log(`index : ${ind} -- C ${Object.values(c)} - pos ${Object.values({x,y})}`);
            return c.x === x && c.y === y;
          });
          if(cell){
            sCells.push({x, y});
            cells.push({x, y});            
          }else {
            cells.push({x, y});            
          }
        }else{
          cells.push({x, y});
        }
        
      }

    });    
  });

  console.log(sCells)

  let minD;

  sCells.forEach(c => {
    const distance = Math.abs(c.x) + Math.abs(c.y);
    if (!minD || distance < minD) minD = distance;
  });
  console.log(minD)
});

