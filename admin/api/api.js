const express = require('express');
const fs = require('fs');
const workerlist = require('./workerlist.json');

function log(type, content) {
    if (type == 'error') {
        console.error(content);
        fs.writeFileSync();
    }

    if (type == 'log') {
        console.log(content);
    }
}