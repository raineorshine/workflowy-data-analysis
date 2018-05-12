const fs = require('fs')
const xml2json = require('xml2json')

const data = fs.readFileSync('./data.opml', 'utf-8')
console.log(xml2json.toJson(data, {
  object: true
}))
