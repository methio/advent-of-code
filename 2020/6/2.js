const fs = require('fs');

fs.readFile('input.txt', 'utf8', (e, data) => {
  //console.log(data);

  //set up data
  data = data
          .split('\n\n')                    
          .map(m=> m
                  .replace(/\n/g, ' ')
                  //.join('')
          );
  // console.log(data);

  let questionsAnsweredByAllInTheGroup = 0;
  
  for(const group of data){
    const nbOfPerson = group.split(' ');
    // console.log(nbOfPerson);

    const questions = [...new Set(group.split('').filter(f => f !== ' '))]; //regarde si pas de vide
    // console.log(questions);

    for (const question of questions) {
      if (nbOfPerson.every(e => e.includes(question)))questionsAnsweredByAllInTheGroup += 1;
      // console.log(questionsAnsweredByAllInTheGroup);      
    }    
  }

  console.log(questionsAnsweredByAllInTheGroup);
})