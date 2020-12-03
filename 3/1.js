const fs = require('fs');
let elements; //map rows handler

fs.readFile('input.txt', 'utf8', (e, data) => {
  elements = data.split('\n'); //line split

  //on avance 
  const avancement = bruitDeLuge(0, 0, 0, 1, 3);
  //les autres chemins
  const part2 = autresVoies();

  console.log("arbres croisés : " + part2);
});


function autresVoies(){
  const chemin1 = bruitDeLuge(0, 0, 0, 1, 1);
  const chemin2 = bruitDeLuge(0, 0, 0, 1, 3);
  const chemin3 = bruitDeLuge(0, 0, 0, 1, 5);
  const chemin4 = bruitDeLuge(0, 0, 0, 1, 7);
  const chemin5 = bruitDeLuge(0, 0, 0, 2, 1);
  console.log("chemin1 : " + chemin1 + ", chemin2 : " + chemin2 + ", chemin3 : " + chemin3 + ", chemin4 : " + chemin4 + ", chemin5 : " + chemin5);

  return chemin1*chemin2*chemin3*chemin4*chemin5;
}

function bruitDeLuge(trees, posRow, posCol, directionRow, directionCol){
  //bloc à regarder
  const card = elements[posRow].substr(posCol, 1);
  
  //si c'est un arbre on augmente le compteur
  if(card === '#'){
    trees ++;
  }

  //on avance en X et si on est en bas on renvoie le nb d'arbre
  posRow += directionRow;
  if(!elements[posRow]) {
    return trees;
  }

  //on avance en Y
  posCol += directionCol;

  //si on est au bout de la colonne on revient au début
  if (posCol > elements[posRow].length - 1) {
    posCol -= elements[posRow].length;
  }

  //recursivity
  return bruitDeLuge(trees, posRow, posCol, directionRow, directionCol);
}