const fs = require('fs')

function readJson(file = '../data.json') {
    // read JSON object from file
    const data = fs.readFileSync(file, 'utf8')
    return JSON.parse(data)
}

function writeJson(obj, file = '../data.json') {
    if (!obj) return console.log('Please provide data to save')
    try {
        fs.writeFileSync(file, JSON.stringify(obj)) //overwrites current data
        return console.log('SAVE SUCESS')
    } catch (err) {
        return console.log('FAILED TO WRITE')
    }
}

module.exports = { readJson, writeJson }