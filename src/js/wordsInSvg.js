const d3 = require('d3')

export function getWordsWithDimensions (wordsList, fontSpec, tagFontSpec, widthBetweenWords, getTextWidth, baseOrParallel, baseOrParallelLonger, longerBy) {
  let words = wordsList.sort((a, b) => a.order - b.order)
  let wordGroupStart = (baseOrParallel === baseOrParallelLonger) ? 15 : longerBy / 2 + 15
  words.forEach(obj => {
    obj.treeLayers = words.length - 1
    obj.wordGroupStart = wordGroupStart
    let maxWidth = d3.max([getTextWidth(obj.word, fontSpec), getTextWidth(obj.tag, tagFontSpec)])
    obj.wordGroupWidth = maxWidth
    wordGroupStart += maxWidth + widthBetweenWords * 2
  })
  return words
}
