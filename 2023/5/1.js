const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
if (err) throw err;

data = data.split('\n\n')
           .map((line, index) => {
            let [name, maps] = line.split(':');
            name = index === 0 ? name : name.substring(0, name.indexOf(' '));
            maps = index === 0 ? maps.trim().split(' ').map(d=>parseInt(d)) : maps.trim().split('\n').map(e => e.split(' ').map(d=>parseInt(d)));

            return {name, maps};
           });

// [destination range start, source range start, range length]

console.log(data[1].maps);
});