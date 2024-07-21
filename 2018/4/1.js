const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) throw err;

    data = data.split('\n');

    // on découpe la donnée dans un tableau
    let actions = [];
    for (let action of data){
        const when = action.substring(action.indexOf('518')+3, action.indexOf(']')).replace(/-/g, '').replace(' ', '').replace(':','');
        const who = action.indexOf('#')>1 ? action.split('#')[1].substring(0, 2) : false;
        const what = action.split('] ')[1].trim();
        actions.push({when, who, what});
    }

    // on met la donnée en ordre temporel
    actions.sort((a,b)=> a.when - b.when);

    // on attribut des IDs à toutes les actions (s'endort / se réveille)
    let ID = 0;
    actions.forEach(action => action.who ? ID = action.who : action.who = ID);

    // on calcule le temps de chaque garde
    let guards = {};

    actions.forEach((a, ind) => {
        if(a.what === "falls asleep"){
            const start = parseInt(a.when.slice(-2));
            const end = parseInt(actions[ind+1].when.slice(-2));

            // chaque entrée du tableau = 1 minute, pour chaque jour on fait +1 si il dormait à cette minute
            for(let i = start; i < end; i++){
                if(!guards[a.who]) guards[a.who] = {"minutes" : []};
                if(!guards[a.who].minutes[i]) guards[a.who].minutes[i] = 0;
                guards[a.who].minutes[i] += 1;
            }
        }

    });

    // calcul somme du temps
    for(const guardID of Object.keys(guards)){   
        const minutesArr = guards[guardID].minutes;
        guards[guardID].total = minutesArr.reduce((acc, cur) => acc+cur, 0);   
    }

    // calcul de l'ID du garde le plus feignant
    const feignant = Object.keys(guards).reduce((a,b) => guards[a].total > guards[b].total ? a : b);

    // calcul meilleur moment (là où il dort le plus)
    let max = 0; 
    for (let minute of Object.keys(guards[feignant].minutes)) {
        const slept = guards[feignant].minutes[minute];
        if (slept > max) max = slept;
    }
    const horaireIdeal = guards[feignant].minutes.indexOf(max);
    
    console.log(feignant, horaireIdeal, `answer : ${feignant * horaireIdeal}`);

});