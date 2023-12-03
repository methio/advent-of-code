const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
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

  // ids store all games id
  let ids = [];
  // impIds store all impossible games id
  let impIds = [];

  games.forEach((game) => {
    ids.push(game.id);
    game.sets.forEach((set) => {
      set.forEach((cube) => {
        // rules so the game is impossible
        const c1 = cube.color == "red" && cube.num > 12;
        const c2 = cube.color == "green" && cube.num > 13;
        const c3 = cube.color == "blue" && cube.num > 14;

        if (c1 || c2 || c3) {
          // check if new value
          if (!impIds.includes(game.id)) {
            impIds.push(game.id);
          }
        }
      });
    });
  });


  // remove impossible games id from all games id
  ids = ids.filter((val) => !impIds.includes(val));

  // get sum of all possible games
  const sum = ids.reduce((a, b) => a + b, 0);

  console.log(sum);
});
