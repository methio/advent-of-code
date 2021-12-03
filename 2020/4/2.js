const fs = require('fs');
let validPasseports = 0; 

fs.readFile('input.txt', 'utf8', (e, data) => {

  data = data
      .split('\n\n') // un objet par array
      .map(entry=>(  // on découpe en map pour les ranger dans un objet chacun
        Object.fromEntries(entry
                            .split(/ |\n/) //split à espace + retour ligne
                            .map(field=>field.split(':'))) // split + fait un entrée dans l'objet pour chaque :
      ))

  //console.log(data);

  for(let passeport of data){
    //console.log(passeport);

    //country ID
    delete passeport.cid;

    if(Object.keys(passeport).length < 7) continue;
    //console.log('cid valid');

    //Birth year
    const birth = parseInt(passeport.byr);
    if(birth < 1920 || birth > 2002) continue;
    //console.log('byr valid');

    //issue Year
    const issue = parseInt(passeport.iyr);
    if(issue < 2010 || issue > 2020 ) continue;
    //console.log('iyr valid');

    //Expiration year
    const expy = parseInt(passeport.eyr);
    if(expy < 2020 || expy > 2030 ) continue;
    // console.log('eyr valid');

    //height cm or in
    const heig = parseInt(passeport.hgt);
    if(passeport.hgt.endsWith('in') && (heig < 59 || heig > 76)) continue;
    else if(passeport.hgt.endsWith('cm') && (heig < 150 || heig > 193)) continue;
    else if(!passeport.hgt.endsWith('cm') && !passeport.hgt.endsWith('in')) continue;
    // console.log('hgt valid');

    //hair color
    const hcol = passeport.hcl;
    if(passeport.hcl.length !== 7 || !(/#[a-f0-9]{6}/.test(hcol))) continue;
    // console.log('hcl valid');

    //eyes color
    const ecol = passeport.ecl;
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecol)) continue;
    // console.log('ecl valid');

    //passeport ID
    const paid = passeport.pid;
    if(paid.length !== 9) continue;
    
    validPasseports ++;
    console.log(passeport);
    console.log('\n');
  }

  console.log(validPasseports);
});


/*
ressources I learned 
_ REGex : https://www.w3schools.com/jsref/jsref_regexp_wordchar.asp
_ split with regEx : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
_ exec : cherche un cararctère dans un string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
_ transforme les paires en un seul objet : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
*/
