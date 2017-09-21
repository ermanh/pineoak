const d3 = require('d3')

export function drawD3 (sentences, drawConfig) {
  if (!sentences || sentences === '') {
    d3.select('#sentences-list').selectAll('li').remove()
  }

  const { getWidth, getHeight, getTextWidth, getAlignmentStartY } = require('../js/svgDimensions')
  const { getWordsWithDimensions } = require('../js/wordsInSvg')
  const { getPath, getDeprelPathArrow, getAlignmentPath } = require('../js/paths.js')
  const { getLabelX, getLabelY } = require('../js/deprels')
  const { mainSentenceHeight, firstDeprelHeight, singleDeprelHeight,
    singleLineHeight, nextLineStart, lineWordProperties,
    widthBetweenWords, alignmentsHeight, treetopSpace,
    fontSpec, tagFontSpec, deprelFontSpec,
    deprelTextHeight, deprelBoxRadius, textColor, tagColor
  } = drawConfig
  const sentIdRE = new RegExp(/_\d+?$/)

  /* eslint-disable no-unused-vars */
  d3.select('#sentences-list').selectAll('li').remove()
  const svg = d3.select('#sentences-list')
    .selectAll('li')
    .data(sentences)
    .enter()
    .append('li')
    .attr('class', 'sentenceBkg')
    .attr('id', function (d) { return d.baseSentence._key })
    .append('svg')
    .attr('width', function (d) { return getWidth(d.baseSentence.words, d.parallelSentence.words, widthBetweenWords, fontSpec, tagFontSpec).width })
    .attr('height', function (d) { return getHeight(d.baseSentence.words, d.parallelSentence.words, d.parallelSentence.isEmpty, mainSentenceHeight, alignmentsHeight, singleLineHeight, singleDeprelHeight, firstDeprelHeight, treetopSpace) })

  const base = svg.append('g')
    .attr('class', 'base')
    .attr('id', function (d) { return 'baseSentence-' + d.baseSentence.order })

  const baseSentence = base.append('text')
    .attr('id', 'sentenceNormal')
    .attr('x', '0')
    .attr('y', '15')
    .attr('fill', textColor)
    .attr('style', 'font-weight:bold')
    .text(function (d) {
      return (d.baseSentence.order !== '') ? d.baseSentence.order + '. ' + d.baseSentence.sentence : ''
    })

  const baseWordGroups = base.selectAll('g.baseWordGroup')
    .data(function (d) {
      const widthObj = getWidth(d.baseSentence.words, d.parallelSentence.words, widthBetweenWords, fontSpec, tagFontSpec)
      const baseOrParallelLonger = widthObj.baseOrParallelLonger
      const longerBy = widthObj.longerBy
      return getWordsWithDimensions(d.baseSentence.words, fontSpec, tagFontSpec, widthBetweenWords, getTextWidth, 'base', baseOrParallelLonger, longerBy)
    })
    .enter()
    .append('g')
    .attr('class', 'baseWordGroup wordGroup')
    .attr('id', function (w) { return 'wordGroup-' + w._key })
    .attr('order', function (w) { return w.order })
    .attr('wordGroupWidth', function (w) { return w.wordGroupWidth })
    .attr('word-id', function (w) { return w._key })

  const baseWordBox = baseWordGroups.append('rect')
    .attr('class', 'wordBox')
    .attr('x', function (w) { return w.wordGroupStart - 5 })
    .attr('y', function (w) {
      const y = mainSentenceHeight + firstDeprelHeight + singleDeprelHeight * (w.treeLayers - 1) + treetopSpace
      return y + 4
    })
    .attr('rx', '5')
    .attr('ry', '5')
    .attr('width', function (w) { return w.wordGroupWidth + 11 })
    .attr('height', nextLineStart + singleLineHeight + 6)
    .attr('fill', 'white')

  const baseWordTier = baseWordGroups.append('text')
    .attr('class', 'word')
    .attr('x', function (w) { return w.wordGroupStart })
    .attr('y', function (w) {
      const y = mainSentenceHeight + firstDeprelHeight + singleDeprelHeight * (w.treeLayers - 1) + treetopSpace + nextLineStart
      w.baseWordY = y
      return y
    })
    .attr('fill', textColor)
    .text(function (w) { return w.word })

  const baseTagTier = baseWordGroups.append('text')
    .attr('class', 'tag')
    .attr('style', 'font-size:10pt;')
    .attr('fill', tagColor)
    .attr('x', function (w) { return w.wordGroupStart })
    .attr('y', function (w) { return w.baseWordY + nextLineStart })
    .text(function (w) { return w.tag })

  const alignmentsBox = svg.append('rect')
    .attr('class', function (d) {
      let base = 'alignmentsBox '
      if (d.parallelSentence.isEmpty) {
        base += ' alignmentsBox-' + d.baseSentence._key + '-' + d.baseLang + '--noparallel'
      } else {
        base += ' alignmentsBox-' + d.baseSentence._key + '-' + d.baseLang + '--' + d.parallelSentence._key + '-' + d.parallelLang
      }
      // base += ' alignmentsBox-' + d.parallelSentence._key + '-' + d.parallelLang + '--' + d.baseSentence._key + '-' + d.baseLang
      return base
    })
    // .attr('id', function (d) { return 'alignmentsBox-' + d.baseSentence._key + '-' + d.parallelSentence._key })
    .attr('x', '0')
    .attr('y', function (d) {
      const alignmentsStart = getAlignmentStartY(d.baseSentence.words, firstDeprelHeight, singleDeprelHeight, singleLineHeight, lineWordProperties, treetopSpace) - 4
      d.alignmentsStart = alignmentsStart
      return alignmentsStart
    })
    .attr('width', function (d) { return getWidth(d.baseSentence.words, d.parallelSentence.words, widthBetweenWords, fontSpec, tagFontSpec).width })
    .attr('height', function (d) { return d.parallelSentence.isEmpty ? '0' : alignmentsHeight })
    .attr('fill', 'none') // 'var(--pine-green-L1)')

  const parallel = svg.append('g')
    .attr('class', 'parallel')
    .attr('id', function (d) { return 'parallelSentence-' + d.parallelSentence.order })

  const parallelSentence = parallel.append('text')
    .attr('id', 'sentenceNormal')
    .attr('x', '0')
    .attr('y', function (d) {
      const treeHeight = firstDeprelHeight + singleDeprelHeight * (d.parallelSentence.words.length - 2) + treetopSpace
      const linesHeight = singleLineHeight * lineWordProperties + 5
      return d.alignmentsStart + alignmentsHeight + treeHeight + linesHeight + mainSentenceHeight + 8
    })
    .attr('fill', textColor)
    .attr('style', 'font-weight:bold;')
    .text(function (d) {
      return (d.parallelSentence.order !== '') ? d.parallelSentence.order + '. ' + d.parallelSentence.sentence : ''
    })

  const parallelWordGroups = parallel.selectAll('g.parallelWord')
    .data(function (d) {
      const widthObj = getWidth(d.baseSentence.words, d.parallelSentence.words, widthBetweenWords, fontSpec, tagFontSpec)
      const baseOrParallelLonger = widthObj.baseOrParallelLonger
      const longerBy = widthObj.longerBy
      let words = getWordsWithDimensions(d.parallelSentence.words, fontSpec, tagFontSpec, widthBetweenWords, getTextWidth, 'parallel', baseOrParallelLonger, longerBy)
      words.forEach(obj => { obj.alignmentsStart = d.alignmentsStart })
      return words
    })
    .enter()
    .append('g')
    .attr('class', 'parallelWordGroup wordGroup')
    .attr('id', function (w) { return 'wordGroup-' + w._key })
    .attr('order', function (w) { return w.order })
    .attr('wordGroupWidth', function (w) { return w.wordGroupWidth })
    .attr('word-id', function (w) { return w._key })

  const parallelWordBox = parallelWordGroups.append('rect')
    .attr('class', 'wordBox')
    .attr('x', function (w) { return w.wordGroupStart - 5 })
    .attr('y', function (w) { return w.alignmentsStart + alignmentsHeight + 5 })
    .attr('rx', '5')
    .attr('ry', '5')
    .attr('width', function (w) { return w.wordGroupWidth + 11 })
    .attr('height', nextLineStart + singleLineHeight + 6)
    .attr('fill', 'white')

  const parallelTagTier = parallelWordGroups.append('text')
    .attr('class', 'tag')
    .attr('style', 'font-size:10pt;')
    .attr('fill', tagColor)
    .attr('x', function (w) { return w.wordGroupStart })
    .attr('y', function (w) {
      return w.alignmentsStart + alignmentsHeight + 23
    })
    .text(function (w) { return w.tag })

  const parallelWordTier = parallelWordGroups.append('text')
    .attr('class', 'word')
    .attr('x', function (w) { return w.wordGroupStart })
    .attr('y', function (w) { return w.alignmentsStart + alignmentsHeight + 23 + nextLineStart })
    .attr('fill', textColor)
    .text(function (w) { return w.word })

  const deprels = svg.append('g')
    .attr('class', 'deprels')
    .attr('id', function (d) {
      const id = 'deprels-' + d.baseSentence._key + '-' + d.baseLang
      const parallel = d.parallelSentence.isEmpty ? 'noparallel' : d.parallelSentence._key + '-' + d.parallelLang
      return id + '--' + parallel
    })
    .selectAll('g.deprelGroup')
    .data(function (sentences) { return sentences.deprels })
    .enter()
    .append('g')
    .attr('class', 'deprelGroup')
    .attr('id', function (d) { return 'deprel-' + d._from + '--' + d._to })
    .attr('_from', function (d) { return d._from })
    .attr('_to', function (d) { return d._to })

  const deprelPaths = deprels.append('path')
    .attr('class', function (d) { return 'pathLine ' + d.deprel })
    .attr('d', function (d) {
      const fromElem = d3.select('#wordGroup-' + d._from)
      const toElem = d3.select('#wordGroup-' + d._to)
      const upOrDown = d3.select('#wordGroup-' + d._from).attr('class').includes('baseWordGroup') ? 'up' : 'down'
      return getPath(d, fromElem, toElem, upOrDown, singleDeprelHeight, firstDeprelHeight)
    })
    .attr('stroke', 'var(--acorn-gray-D1)')
    .attr('stroke-width', '0.8')
    .attr('fill', 'none')

  const deprelPathArrows = deprels.append('path')
    .attr('class', function (d) { return 'pathArrow ' + d.deprel })
    .attr('d', function (d) {
      return getDeprelPathArrow(d, d.pointsLeft, d.pointsUp)
    })
    .attr('stroke', 'var(--acorn-gray-D1)')
    .attr('stroke-width', '0.8')
    .attr('fill', 'var(--acorn-gray-D1)')

  const deprelBoxes = deprels.append('rect')
    .attr('class', function (d) { return 'deprelBox ' + d.deprel })
    .attr('x', function (d) { return getLabelX(d, getTextWidth, deprelFontSpec).boxX })
    .attr('y', function (d) { return getLabelY(d, deprelTextHeight).boxY })
    .attr('rx', deprelBoxRadius)
    .attr('ry', deprelBoxRadius)
    .attr('width', function (d) { return getLabelX(d, getTextWidth, deprelFontSpec).boxWidth })
    .attr('height', function (d) { return getLabelY(d, deprelTextHeight).boxHeight })
    .attr('fill', 'white')
    .attr('stroke', 'var(--acorn-gray-D1)')
    .attr('stroke-width', '0.8')

  const deprelTexts = deprels.append('text')
    .attr('class', function (d) { return 'deprelText ' + d.deprel })
    .attr('x', function (d) { return getLabelX(d, getTextWidth, deprelFontSpec).textX })
    .attr('y', function (d) { return getLabelY(d, deprelTextHeight).textY })
    .attr('fill', textColor)
    .text(function (d) { return d.deprel })

  const alignments = svg.append('g')
    .attr('class', 'alignments')
    .attr('id', function (d) { return 'alignments-' + d.baseSentence._key + '-' + d.baseLang + '--' + d.parallelSentence._key + '-' + d.parallelLang })

  const alignmentPaths = alignments.selectAll('path.alignmentPath')
    .data(function (d) {
      return d.wordAlignments
    })
    .enter()
    .append('path')
    .attr('class', 'alignmentPath')
    .attr('_from', function (d) { return d._from })
    .attr('_to', function (d) { return d._to })
    .attr('id', function (a) { return 'alignmentPath-' + a._from + '--' + a._to })
    .attr('d', function (a) {
      let fromElem, upOrDown, alignmentStartY
      if (document.getElementById('wordGroup-' + a._from)) {
        fromElem = d3.select('#wordGroup-' + a._from)
        upOrDown = d3.select('#wordGroup-' + a._from).attr('class').includes('baseWordGroup') ? 'up' : 'down'
      } else {
        fromElem = null
        upOrDown = null
      }
      const toElem = document.getElementById('wordGroup-' + a._to) ? d3.select('#wordGroup-' + a._to) : null
      if (document.getElementsByClassName('alignmentsBox-' + a._from.replace(sentIdRE, '') + '--' + a._to.replace(sentIdRE, '')).length > 0) {
        alignmentStartY = parseFloat(d3.select('.alignmentsBox-' + a._from.replace(sentIdRE, '') + '--' + a._to.replace(sentIdRE, '')).attr('y'))
      } else {
        alignmentStartY = 0
      }
      return getAlignmentPath(fromElem, toElem, upOrDown, alignmentStartY, alignmentsHeight)
    })
    .attr('stroke', 'var(--acorn-gray-D1)')
    .attr('stroke-width', '0.5')
}
