/* jshint esversion: 6 */
const d3 = require('d3')

export function getWidth (baseWords, parallelWords, widthBetweenWords, fontSpec, tagFontSpec) {
  const adjustment = 15
  const baseTextWidth = baseWords.reduce((accum, obj) => {
    return accum + d3.max([getTextWidth(obj.word, fontSpec), getTextWidth(obj.tag, tagFontSpec)])
  }, 0)
  const parallelTextWidth = parallelWords.reduce((accum, obj) => {
    return accum + d3.max([getTextWidth(obj.word, fontSpec), getTextWidth(obj.tag, tagFontSpec)])
  }, 0)

  const baseTotalLength = baseTextWidth + baseWords.length * widthBetweenWords * 2 + adjustment
  const parallelTotalLength = parallelTextWidth + parallelWords.length * widthBetweenWords * 2 + adjustment

  const width = d3.max([baseTotalLength, parallelTotalLength])
  const baseOrParallelLonger = width === baseTotalLength ? 'base' : 'parallel'
  const longerBy = Math.abs(baseTotalLength - parallelTotalLength)
  return { width: width, baseOrParallelLonger: baseOrParallelLonger, longerBy: longerBy }
}

export function getHeight (baseWords, parallelWords, parallelIsEmpty, mainSentenceHeight, alignmentsHeight, singleLineHeight, singleDeprelHeight, firstDeprelHeight, treetopSpace) {
  const baseLayersArr = baseWords.map(obj => Object.keys(obj).length - 1)
  const parallelLayersArr = parallelWords.map(obj => Object.keys(obj).length - 1)

  const baseMaxLayers = d3.max(baseLayersArr)
  const parallelMaxLayers = d3.max(parallelLayersArr)

  let lineLayers = d3.max([baseMaxLayers, parallelMaxLayers])
  const deprelLayers = parallelIsEmpty ? baseWords.length - 2 : baseWords.length - 2 + parallelWords.length - 2

  // double the following if parallel sentence is NOT empty
  lineLayers = parallelIsEmpty ? lineLayers : lineLayers * 2
  firstDeprelHeight = parallelIsEmpty ? firstDeprelHeight : firstDeprelHeight * 2
  treetopSpace = parallelIsEmpty ? treetopSpace : treetopSpace * 2
  mainSentenceHeight = parallelIsEmpty ? mainSentenceHeight : mainSentenceHeight * 2
  alignmentsHeight = parallelIsEmpty ? 0 : alignmentsHeight

  const lines = singleLineHeight * lineLayers
  const deprels = singleDeprelHeight * deprelLayers + firstDeprelHeight

  const height = lines + deprels + alignmentsHeight + treetopSpace + mainSentenceHeight
  return height
}

export function getTextWidth (text, font) {
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  var context = canvas.getContext('2d')
  context.font = font
  var metrics = context.measureText(text)
  return metrics.width
}

export function getAlignmentStartY (words, firstDeprelHeight, singleDeprelHeight, singleLineHeight, lineWordProperties, treetopSpace) {
  const treeHeight = firstDeprelHeight + (words.length - 1) * singleDeprelHeight
  const linesHeight = lineWordProperties * singleLineHeight
  return treeHeight + linesHeight + singleLineHeight + treetopSpace
}
