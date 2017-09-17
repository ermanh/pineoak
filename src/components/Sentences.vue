<template>
  <div class="page-container">
    <h1>{{ textNameClean }}</h1>
    <div id="sentences-container">
      <p style="margin-bottom:20px;">
        <button>create new sentence</button>
      </p>
      <ul id="sentences-list">
      </ul>
    </div>
    <div class="modal is-active" id="sentence-modal" v-if="showModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Create new sentence
          </p>
          <button class="delete" @click="showModal=false"></button>
        </header>
        <form id="add-project" action="#" method="POST" @submit.prevent="onSubmit">
        <section class="modal-card-body">
          <ul>
            <li>
              <label for="name">* Sentence (normal) </label>
              <input type="text" id="sentence-normal" name="sentence-normal" placeholder="required" v-model="form.sentenceNormal">
            </li>
            <li>
              <label for="base-text" class="label-textarea">Sentence (segmented) </label>
              <input type="text" id="sentence-segmented" name="sentence-segmented" placeholder="required" v-model="form.sentenceSegmented">
            </li>
            <li>
              <label for="base">* Primary language</label>
              <input type="text" id="base" name="base" placeholder="required" v-model="form.base">
            </li>
            <li>
              <label for="parallel">Parallel language</label>
              <input type="text" id="parallel" name="parallel" placeholder="optional" v-model="form.parallel">
            </li>
          </ul>
        </section>
        <footer class="modal-card-foot">
          <div>
            <button>Create</button>
            <button type="reset">Clear</button>
          </div>
        </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const d3 = require('d3')
export default {
  name: 'sentences',

  data () {
    return {
      showModal: false,
      textName: this.$route.params.text,
      textNameClean: this.$route.params.text.replace(/-/g, ' '),
      msg: 'PineOak Sentences',
      sentenceAlignments: [ // must be queried separately
        { _from: '1_wiy', _to: '1_eng', _key: 'sa1' }
      ],
      sentences: [
        {
          text: 'text1',
          baseSentence: {
            _key: '1_wiy',
            order: 1,
            sentence: 'Kitko kowoliswilh.',
            words: [
              { _key: '1_wiy_1', order: 1, word: 'kitko', tag: 'AUX' },
              { _key: '1_wiy_2', order: 2, word: 'kowoliswilh', tag: 'VERB' },
              { _key: '1_wiy_3', order: 3, word: '.', tag: 'PUNCT' }
            ]
          },
          parallelSentence: {
            _key: '1_eng',
            order: 1,
            sentence: 'He\'s going to start to sing.',
            words: [
              { _key: '1_eng_1', order: 1, word: 'he', tag: 'PRON' },
              { _key: '1_eng_2', order: 2, word: 'is', tag: 'AUX' },
              { _key: '1_eng_3', order: 3, word: 'going', tag: 'VERB' },
              { _key: '1_eng_4', order: 4, word: 'to', tag: 'PART' },
              { _key: '1_eng_5', order: 5, word: 'start', tag: 'VERB' },
              { _key: '1_eng_6', order: 6, word: 'to', tag: 'PART' },
              { _key: '1_eng_7', order: 7, word: 'sing', tag: 'VERB' },
              { _key: '1_eng_8', order: 8, word: '.', tag: 'PUNCT' }
            ]
          },
          wordAlignments: [
            { _from: '1_wiy_1', _to: '1_eng_2' },
            { _from: '1_wiy_1', _to: '1_eng_3' },
            { _from: '1_wiy_1', _to: '1_eng_4' },
            { _from: '1_wiy_2', _to: '1_eng_5' },
            { _from: '1_wiy_2', _to: '1_eng_6' },
            { _from: '1_wiy_2', _to: '1_eng_7' },
            { _from: '1_wiy_3', _to: '1_eng_8' }
          ],
          deprels: [
            { _from: '1_wiy_2', _to: '1_wiy_1', deprel: 'aux' },
            { _from: '1_wiy_2', _to: '1_wiy_3', deprel: 'punct' },
            { _from: '1_eng_3', _to: '1_eng_1', deprel: 'nsubj' },
            { _from: '1_eng_3', _to: '1_eng_2', deprel: 'aux' },
            { _from: '1_eng_3', _to: '1_eng_5', deprel: 'xcomp' },
            { _from: '1_eng_5', _to: '1_eng_4', deprel: 'mark' },
            { _from: '1_eng_5', _to: '1_eng_7', deprel: 'xcomp' },
            { _from: '1_eng_7', _to: '1_eng_6', deprel: 'mark' },
            { _from: '1_eng_3', _to: '1_eng_8', deprel: 'punct' }
            // { _from: '1_wiy_1', _to: '1_wiy_3', deprel: 'highest' },
            // { _from: '1_eng_1', _to: '1_eng_8', deprel: 'highest' }
          ]
        },
        {
          text: 'text2',
          baseSentence: {
            _key: '2_wiy',
            order: 2,
            sentence: 'Ho\'rach kitko kowa boyaga\'rabiyutw.',
            words: [
              { _key: '2_wiy_1', order: 1, word: 'ho\'rach', tag: 'NOUN' },
              { _key: '2_wiy_2', order: 2, word: 'kitko', tag: 'AUX' },
              { _key: '2_wiy_3', order: 3, word: 'kowa', tag: 'AUX' },
              { _key: '2_wiy_4', order: 4, word: 'boyaga\'rabiyutw', tag: 'VERB' },
              { _key: '2_wiy_5', order: 5, word: '.', tag: 'PUNCT' }
            ]
          },
          parallelSentence: {
            _key: '2_eng',
            order: 2,
            sentence: 'I\'m going to tell a story about Snake.',
            words: [
              { _key: '2_eng_1', order: 1, word: 'I', tag: 'PRON' },
              { _key: '2_eng_2', order: 2, word: 'am', tag: 'AUX' },
              { _key: '2_eng_3', order: 3, word: 'going', tag: 'VERB' },
              { _key: '2_eng_4', order: 4, word: 'to', tag: 'PART' },
              { _key: '2_eng_5', order: 5, word: 'tell', tag: 'VERB' },
              { _key: '2_eng_6', order: 6, word: 'a', tag: 'DET' },
              { _key: '2_eng_7', order: 7, word: 'story', tag: 'NOUN' },
              { _key: '2_eng_8', order: 8, word: 'about', tag: 'PREP' },
              { _key: '2_eng_9', order: 9, word: 'Snake', tag: 'NOUN' },
              { _key: '2_eng_10', order: 10, word: '.', tag: 'PUNCT' }
            ]
          },
          wordAlignments: [
            { _from: '2_wiy_1', _to: '2_eng_9' },
            { _from: '2_wiy_2', _to: '2_eng_2' },
            { _from: '2_wiy_2', _to: '2_eng_3' },
            { _from: '2_wiy_2', _to: '2_eng_4' },
            { _from: '2_wiy_4', _to: '2_eng_5' },
            { _from: '2_wiy_4', _to: '2_eng_6' },
            { _from: '2_wiy_4', _to: '2_eng_7' },
            { _from: '2_wiy_4', _to: '2_eng_8' },
            { _from: '2_wiy_5', _to: '2_eng_10' }
          ],
          deprels: [
            { _from: '2_wiy_4', _to: '2_wiy_1', deprel: 'obj' },
            { _from: '2_wiy_4', _to: '2_wiy_2', deprel: 'aux' },
            { _from: '2_wiy_4', _to: '2_wiy_3', deprel: 'aux' },
            { _from: '2_wiy_4', _to: '2_wiy_5', deprel: 'punct' },
            { _from: '2_eng_3', _to: '2_eng_1', deprel: 'nsubj' },
            { _from: '2_eng_3', _to: '2_eng_2', deprel: 'aux' },
            { _from: '2_eng_3', _to: '2_eng_5', deprel: 'xcomp' },
            { _from: '2_eng_5', _to: '2_eng_4', deprel: 'mark' },
            { _from: '2_eng_5', _to: '2_eng_7', deprel: 'obj' },
            { _from: '2_eng_7', _to: '2_eng_6', deprel: 'det' },
            { _from: '2_eng_7', _to: '2_eng_9', deprel: 'nmod' },
            { _from: '2_eng_9', _to: '2_eng_8', deprel: 'case' },
            { _from: '2_eng_3', _to: '2_eng_10', deprel: 'punct' }
          ]
        }
      ]
    }
  },

  mounted: function () {
    const { getWidth, getHeight, getTextWidth, getAlignmentStartY } = require('../js/svgDimensions')
    const { getWordsWithDimensions } = require('../js/wordsInSvg')
    const { getPath, getDeprelPathArrow, getAlignmentPath } = require('../js/paths.js')
    const { getLabelX, getLabelY } = require('../js/deprels')
    const mainSentenceHeight = 25
    const firstDeprelHeight = 35
    const singleDeprelHeight = 23
    const singleLineHeight = 20
    const nextLineStart = 23
    const lineWordProperties = 2
    const widthBetweenWords = 10
    const alignmentsHeight = 80
    const treetopSpace = 10
    const fontSpec = 'bold 1.6em Avenir'
    const tagFontSpec = 'normal 10pt Avenir'
    const deprelFontSpec = 'bold 13.8px Arial'
    const deprelTextHeight = 10
    const deprelBoxRadius = 2
    const textColor = 'var(--acorn-gray-D1)'
    const tagColor = '#2a6596' // darker steelblue
    const sentIdRE = new RegExp(/^\w+?_\w+?(?=_)/)

    const svg = d3.select('#sentences-list')
      .selectAll('li')
      .data(this.sentences)
      .enter()
      .append('li')
      .attr('class', 'sentenceBkg')
      .attr('id', function (d) { return d.baseSentence._key })
        .append('svg')
        .attr('width', function (d) { return getWidth(d.baseSentence.words, d.parallelSentence.words, widthBetweenWords, fontSpec, tagFontSpec).width })
        .attr('height', function (d) { return getHeight(d.baseSentence.words, d.parallelSentence.words, mainSentenceHeight, alignmentsHeight, singleLineHeight, singleDeprelHeight, firstDeprelHeight, treetopSpace) })

    const base = svg.append('g')
      .attr('id', function (d) { return 'baseSentence-' + d.baseSentence.order })

    const baseSentence = base.append('text')
      .attr('id', 'sentenceNormal')
      .attr('x', '0')
      .attr('y', '15')
      .attr('fill', textColor)
      .attr('style', 'font-weight:bold')
      .text(function (d) { return d.baseSentence.order + '. ' + d.baseSentence.sentence })

    const baseWordGroups = base.selectAll('g.baseWordGroup')
      .data(function (d) {
        const widthObj = getWidth(d.baseSentence.words, d.parallelSentence.words, widthBetweenWords, fontSpec, tagFontSpec)
        const baseOrParallelLonger = widthObj.baseOrParallelLonger
        const longerBy = widthObj.longerBy
        return getWordsWithDimensions(d.baseSentence.words, fontSpec, tagFontSpec, widthBetweenWords, getTextWidth, 'base', baseOrParallelLonger, longerBy)
      })
      .enter()
      .append('g')
      .attr('class', 'baseWordGroup')
      .attr('id', function (w) { return 'wordGroup-' + w._key })
      .attr('order', function (w) { return w.order })
      .attr('wordGroupWidth', function (w) { return w.wordGroupWidth })

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
        base += ' alignmentsBox-' + d.baseSentence._key + '-' + d.parallelSentence._key
        base += ' alignmentsBox-' + d.parallelSentence._key + '-' + d.baseSentence._key
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
      .attr('height', alignmentsHeight)
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
      .text(function (d) { return d.parallelSentence.order + '. ' + d.parallelSentence.sentence })

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
      .attr('class', 'parallelWordGroup')
      .attr('id', function (w) { return 'wordGroup-' + w._key })
      .attr('order', function (w) { return w.order })
      .attr('wordGroupWidth', function (w) { return w.wordGroupWidth })

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

    const deprels = svg.selectAll('g.deprelGroup')
      .data(function (sentences) { return sentences.deprels })
      .enter()
      .append('g')
      .attr('class', 'deprelGroup')
      .attr('id', function (d) { return 'deprel-' + d._from + '-' + d._to })

    const deprelPaths = deprels.append('path')
      .attr('class', function (d) { return d.deprel })
      .attr('d', function (d) {
        const fromElem = d3.select('#wordGroup-' + d._from)
        const toElem = d3.select('#wordGroup-' + d._to)
        const upOrDown = d3.select('#wordGroup-' + d._from).attr('class') === 'baseWordGroup' ? 'up' : 'down'
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
      .attr('id', function (d) { return 'alignments-' + d.baseSentence._key + '-' + d.parallelSentence._key })

    const alignmentPaths = alignments.selectAll('path.alignmentPath')
      .data(function (d) {
        return d.wordAlignments
      })
      .enter()
      .append('path')
      .attr('class', 'alignmentPath')
      .attr('id', function (a) { return 'alignmentPath-' + a._from + '-' + a._to })
      .attr('d', function (a) {
        const fromElem = d3.select('#wordGroup-' + a._from)
        const toElem = d3.select('#wordGroup-' + a._to)
        const upOrDown = d3.select('#wordGroup-' + a._from).attr('class') === 'baseWordGroup' ? 'up' : 'down'
        const alignmentStartY = parseFloat(d3.select('.alignmentsBox-' + a._from.match(sentIdRE)[0] + '-' + a._to.match(sentIdRE)[0]).attr('y'))
        return getAlignmentPath(fromElem, toElem, upOrDown, alignmentStartY, alignmentsHeight)
      })
      .attr('stroke', 'var(--acorn-gray-D1)')
      .attr('stroke-width', '0.8')

    console.log(baseSentence)
    console.log(baseWordGroups)
    console.log(baseWordBox)
    console.log(baseWordTier)
    console.log(baseTagTier)
    console.log(alignmentsBox)
    console.log(alignments)
    console.log(alignmentPaths)
    console.log(parallel)
    console.log(parallelSentence)
    console.log(parallelWordGroups)
    console.log(parallelWordBox)
    console.log(parallelTagTier)
    console.log(parallelWordTier)
    console.log(deprelPaths)
    console.log(deprelBoxes, deprelTexts)
    console.log(deprelPathArrows)
    console.log(getAlignmentPath)
  },

  methods: {
    createPath (name) {
      return name.replace(/ /g, '-')
    },
    onSubmit () {
      this.form.submit('post', 'sentences')
        .then(data => {
          alert('Handling it!')
          data.path = this.createPath(data.name)
          this.projects.push(data)
          this.showModal = false
        })
        .catch(err => alert(err))
    }
  }
}
</script>

<style>
.sentenceBkg {
  background-color: var(--pine-green-U1);
  border: 1px var(--acorn-green-M1) solid;
  border-radius: 0.5em;
  margin: 0 50px;
  padding: 30px;
  overflow: scroll;
}
#sentences-container {
  margin-bottom: 60px;
}
#sentences-list {
  text-align: left;
  font-size: 1.1em;
}
#sentences-list li {
  margin-bottom: 15px;
}
.deprelText {
  font-size: 13.8px;
  font-family: Arial, Tahoma, sans-serif;
}
</style>
