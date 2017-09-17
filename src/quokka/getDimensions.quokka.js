const d3 = require('d3')

var sentences = [
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
    }
  },
  {
    text: 'text2',
    baseSentence: {
      _key: '2_wiy',
      order: 2,
      sentence: 'Kitko kowoliswilh.',
      words: [
        { _key: '2_wiy_1', order: 1, word: 'kitko', tag: 'AUX' },
        { _key: '2_wiy_2', order: 2, word: 'kowoliswilh', tag: 'VERB' },
        { _key: '2_wiy_3', order: 3, word: '.', tag: 'PUNCT' }
      ]
    },
    parallelSentence: {
      _key: '2_eng',
      order: 2,
      sentence: 'He\'s going to start to sing.',
      words: [
        { _key: '2_eng_1', order: 1, word: 'he', tag: 'PRON' },
        { _key: '2_eng_2', order: 2, word: 'is', tag: 'AUX' },
        { _key: '2_eng_3', order: 3, word: 'going', tag: 'VERB' },
        { _key: '2_eng_4', order: 4, word: 'to', tag: 'PART' },
        { _key: '2_eng_5', order: 5, word: 'start', tag: 'VERB' },
        { _key: '2_eng_6', order: 6, word: 'to', tag: 'PART' },
        { _key: '2_eng_7', order: 7, word: 'sing', tag: 'VERB' },
        { _key: '2_eng_8', order: 8, word: '.', tag: 'PUNCT' }
      ]
    }
  }
]

const baseWords = sentences[0].baseSentence.words
const parallelWords = sentences[0].parallelSentence.words

const letterWidth = 10
const wordBetweenWidth = 10
const baseMaxLengths = baseWords.map(obj => {
  return d3.max([obj.word.split('').length, obj.tag.split('').length])
})
console.log(baseMaxLengths)

const parallelMaxLengths = parallelWords.map(obj => {
  return d3.max([obj.word.split('').length, obj.tag.split('').length])
})
console.log(parallelMaxLengths)

const baseTotalLength = d3.sum(baseMaxLengths) * letterWidth + baseMaxLengths.length * wordBetweenWidth
console.log(baseTotalLength)

const parallelTotalLength = d3.sum(parallelMaxLengths) * letterWidth + parallelMaxLengths.length * wordBetweenWidth
console.log(parallelTotalLength)

const width = d3.max([baseTotalLength, parallelTotalLength])
console.log('svg width:', width)
