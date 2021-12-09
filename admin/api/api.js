const express = require('express');
const fs = require('fs');
const workerlist = require('./workerlist.json');

try {
    fs.unlinkSync('./logs.log');
}
catch {

}

try {
    fs.unlinkSync('./errors.log');
}
catch {

}


fs.unlinkSync('./errors.log');

function log(type, content, address) {
    if (type == 'error') {
        console.error(content);
        fs.writeFileSync("errors.log", type + ': ' + content);
    }

    if (type == 'log') {
        console.log(`::${content}::`);
        var prev = fs.readFileSync("logs.log", "utf8");
        if (address == undefined) {
            fs.writeFileSync("logs.log", `${prev}\n${type}, ${content}`);
        }
        else {
            fs.writeFileSync("logs.log", `${prev}\n${type}, IP: ${address}: ${content}`);
        }
    }
}

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
    log("log", "Main Requested");
})

app.listen(port, () => {
    log('log', `API listening at http://localhost:${port}`);
})