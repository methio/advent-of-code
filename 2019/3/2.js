const fs = require('fs');
const path = require('path');

console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if(err) throw err;

  const paths = data.split('\n')
                    .map(n => n.split(','));

  const cells = [{x:0,y:0}];
  const sCells = [];
  let pathSteps = [0,0];


  paths.forEach((path, pathIndex) => {
    let x = 0;
    let y = 0;
    let step1 = 0;

    path.forEach(infos => {     
      let dir = infos.charAt(0); 
      let amount = parseInt(infos.substring(1, infos.length));
      
      for(let i = 1; i <= amount; i+=1){
        if(dir === 'R') x ++;
        if(dir === 'D') y --;
        if(dir === 'L') x --;
        if(dir === 'U') y ++;

        pathSteps[pathIndex] +=1;
        
        if(pathIndex > 0){          
          const cell = cells.find(c => { 
            step1 = c.step;           
            return c.x === x && c.y === y;
          });
          if(cell){
            let currentTotalSteps = step1+pathSteps[1];
            let insertIndex = sCells.findIndex(c => c.steps < currentTotalSteps);
                insertIndex = insertIndex >= 0 ? insertIndex : sCells.length;
            sCells.splice(insertIndex, 0, {x, y, steps: currentTotalSteps});
            cells.push({x, y, step: pathSteps[pathIndex]});            
          }else {
            cells.push({x, y, step: pathSteps[pathIndex]});            
          }
        }else{
          cells.push({x, y, step: pathSteps[pathIndex]});
        }        
      }
    });    
  });

  for(let i = sCells.length-1; i > sCells.length-10; i--){
    console.log(sCells[i])
  };
  
});

