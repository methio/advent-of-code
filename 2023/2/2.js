const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  let games = data.split("\n");
  games = games.map((game) => {
    const gameId = parseInt(
      game.split(":")[0].substring(5, game.split(":")[0].length)
    );
    const sets = game
      .split(":")[1]
      .split(";")
      .map((s) =>
        s
          .trim()
          .split(", ")
          .map((s2) => {
            return { num: parseInt(s2.split(" ")[0]), color: s2.split(" ")[1] };
          })
      );

    return {
      id: gameId,
      sets: sets,
    };
  });


let fewests = [];
  games.forEach((game, i) => {
    
    let red = 0;
    let blue = 0;
    let green = 0;

    game.sets.forEach((set) => {
      set.forEach((cube) => {        
        if(cube.color == 'red' && red < cube.num) red = cube.num;
        if(cube.color == 'blue' && blue < cube.num) blue = cube.num;
        if(cube.color == 'green' && green < cube.num) green = cube.num;
      });
    });
    fewests.push(red*green*blue);
  });

const res = fewests.reduce((a, c) => a + c);
console.log(res)
});
