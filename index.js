const fs = require('fs')
const xml2json = require('xml2json')

const data = fs.readFileSync('./data.opml', 'utf-8')
const obj = xml2json.toJson(data, { object: true })

// console.log(obj.opml.body)

const strip = s => s
  .replace(/<\/?[a-z]+>/gi, ' ') // tags
  .replace(/&[a-z]+;/gi, ' ') // entity codes
  .replace(/[^\s\w'&;]/gi, ' ') // emoji and punctuation

const countWords = s => s
  .replace(/\n/g, ' ') // newlines to space
  .replace(/(^\s*)|(\s*$)/gi, '') // remove spaces from start + end
  .replace(/[ ]{2,}/gi, ' ') // 2 or more spaces to 1
  .split(' ').length

const reduceObject = (o, f, lvl=0) => {
  return o.outline.reduce((accum, item) => {
    // console.log(lvl, strip(item.text), countWords(strip(item.text)))
    const words = countWords(strip(item.text))
    accum[lvl] = accum[lvl] || []
    accum[lvl][words] = (accum[lvl][words] || 0) + 1
    return accum
  }, [])
}

/*
words, instances at lvl1, lvl2, lvl3, ...
1, 10, 5, 3
2
3
4
5
...
*/

// array words of array of instances
// const wordCounts = [...Array(20).keys()]
const wordCounts = reduceObject(obj.opml.body)

console.log(wordCounts)
