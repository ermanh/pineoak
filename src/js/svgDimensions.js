/* jshint esversion: 6 */
const d3 = require('d3')

export function getWidth (baseWords, parallelWords, widthBetweenWords, fontSpec, tagFontSpec) {
  const baseTextWidth = baseWords.reduce((accum, obj) => {
    return accum + d3.max([getTextWidth(obj.word, fontSpec), getTextWidth(obj.tag, tagFontSpec)])
  }, 0)
  const parallelTextWidth = parallelWords.reduce((accum, obj) => {
    return accum + d3.max([getTextWidth(obj.word, fontSpec), getTextWidth(obj.tag, tagFontSpec)])
  }, 0)

  const baseTotalLength = baseTextWidth + baseWords.length * widthBetweenWords * 2
  const parallelTotalLength = parallelTextWidth + parallelWords.length * widthBetweenWords * 2

  const width = d3.max([baseTotalLength, parallelTotalLength])
  const baseOrParallelLonger = width === baseTotalLength ? 'base' : 'parallel'
  const longerBy = Math.abs(baseTotalLength - parallelTotalLength)
  return { width: width, baseOrParallelLonger: baseOrParallelLonger, longerBy: longerBy }
}

export function getHeight (baseWords, parallelWords, mainSentenceHeight, alignmentsHeight, singleLineHeight, singleDeprelHeight, firstDeprelHeight, treetopSpace) {
  const baseLayersArr = baseWords.map(obj => Object.keys(obj).length - 1)
  const parallelLayersArr = parallelWords.map(obj => Object.keys(obj).length - 1)

  const baseMaxLayers = d3.max(baseLayersArr)
  const parallelMaxLayers = d3.max(parallelLayersArr)

  const lineLayers = d3.max([baseMaxLayers, parallelMaxLayers])
  const deprelLayers = baseWords.length - 1 + parallelWords.length - 1

  const lines = singleLineHeight * lineLayers * 2
  const deprels = singleDeprelHeight * (deprelLayers - 2) + firstDeprelHeight * 2

  const height = lines + deprels + alignmentsHeight + treetopSpace * 2 + mainSentenceHeight * 2
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
