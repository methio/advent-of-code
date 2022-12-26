const fs = require('fs');
console.clear();
console.log('---------------------------');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if(err) throw err;

  let doublons = 0;
  let pairs = data.split('\n');
  
  for(let pair of pairs){
    let[a, b] = pair
                    .split(',')
                    .map((item) => item
                                      .split('-')
                                      .map((itemSplitted) => parseInt(itemSplitted))
                        );

    console.log(`${a[0]} - ${b[0]} -- ${b[1]} - ${a[1]}`);

    // si a < a' et b > b' alors il est contenu
    // doit marcher si paire 1 englobe paire 2 ou si paire 2 englobe paire 1
    if(a[0] <= b[0] && a[1] >= b[1] || b[0] <= a[0] && b[1] >= a[1]){
      doublons++;
    }
  }
  console.log(doublons);
});