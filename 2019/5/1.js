const fs = require('fs');

fs.readFile('test.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.split(',')
                .map(d=>parseInt(d));

    console.log(data);

    const reverseString = str => {
        return str.split('').reverse().join("");
    }

    const splitInstruction = i => {
        const Amode = i.substring(4) ? parseInt(i.substring(4)) : 0;
        const Bmode = parseInt(i.substring(3,4));
        const Cmode = parseInt(i.substring(2,3));
        const Opcode = parseInt(reverseString(i.substring(0,2)));

        return {Amode, Bmode, Cmode, Opcode}
    }

    const runOnce = (instruction, index) => {
        instruction = reverseString(instruction);
        const ins = splitInstruction(instruction);
        
        console.log(ins);

        const A = data[index + 3]; // always in position mode
        const B = ins.Bmode === 0 ? data[data[index + 2]] : data[index + 2];
        const C = ins.Cmode === 0 ? data[data[index + 1]] : data[index + 1];

        if(ins.Opcode === 1) data[A] = B+C        
        if(ins.Opcode === 2) data[A] = B*C
        if(ins.Opcode === 3) console.log("yo")
        

        console.log(`A:${A} | B:${B} | C:${C} --> ${data}`);


        

        // const Opcodes = {
        //     1 : addition,
        //     2 : multiplication,
        //     3 : save,
        //     4 : get
        // }

        // const mode = {
        //     0 : positionMode,   // get value at position 
        //     1 : immediateMode   // use position as value
        // }

        return "coucou"
    }


    for(let i = 0; i<data.length; i++){
        const instruction = data[i];


        if(instruction.toString().length >= 4){
            runOnce(data[i].toString(), i)


        }
    }

});