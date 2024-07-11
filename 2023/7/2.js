const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
if (err) throw err;
    console.log(data);

});