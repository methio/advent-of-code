const fs = require('fs');

let validFields = 0; 

fs.readFile('data.md', 'utf8', (e, data) => {

  const setUpData = data
      .split('\n\n') // un objet par array
      .map(entry=>(  // on découpe en map pour les ranger dans un objet chacun
        Object.fromEntries(entry
                            .split(/ |\n/) //split à espace + retour ligne
                            .map(field=>field.split(':'))) // split + fait un entrée dans l'objet pour chaque :
      ))

console.log(setUpData);

  for(let i=0; i< setUpData.length; i++){
      if(Object.keys(setUpData[i]).length == 8 || (Object.keys(setUpData[i]).length == 7 && !setUpData[i].cid)){
        validFields ++;
      }      
  }
  console.log(validFields);
});


/*
ressources I learned 
_ REGex : https://www.w3schools.com/jsref/jsref_regexp_wordchar.asp
_ split with regEx : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
_ exec : cherche un cararctère dans un string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
_ transforme les paires en un seul objet : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
*/
