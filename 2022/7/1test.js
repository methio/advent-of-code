fs.readFile('test.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.trim();

    /*
    format json
        "/" : {
            "a" : {
                "e" : {
                    "i": 584
                },
                "f" : 29116,
                "g" : 2557, 
                "h" : 62596,
            },
            "b" : 14848514,
            "c" : 8504156,
            "d" : {
                "j" : 4060174,
                "d" : 8033020,
                "d" : 5626152,
                "k" : 7214296,
            }
        }
    */

    const lines = data.split('\n');
    const commands = [];

    // reorder  the array 
    lines.forEach( (line, index) => {
        // if there is a $, it is a new command
        if(line.charAt(0) === '$'){
            // so create a new entry in array
            commands.push([])
        }
        // then push command responses in there until next command
        commands[commands.length - 1].push(line);
    });
    // console.log(commands);

    const tree = {"/" : {}}; 

    // now we can separate differents commands

    commands.forEach((command, index) => {

        const [dol, type, dir] = command[0].split(' ');
        // console.log(`the command is of type ${type} and target ${dir}`)

        if(type === "cd" && dir !== ".."){

            let files = {};

            commands[index + 1].forEach(cmd => {

                // aller au bon noeud avec dir + je pousse les fichiers et les dossiers 
                const [size, name] = cmd.split(' ');

                if(size !== "$"){
                    // console.log(`taille du fichier : ${size} et nom : ${name}`);
                    const sizeInt = parseInt(size, 10) || size;

                    files = { [`${name}`] : size} ;
            

                }

            });
            // tree.push()
            console.log("---_----");
        }
    });

    // console.log(commands)

    // array of dir
    // const dirs = data.filter( dir => dir.includes('dir'));

});