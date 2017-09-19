/* jshint esversion:6 */

export function conllToJson (raw) {
  let cleaned = raw.replace(/\r/g, '').trim()
  cleaned = cleaned.replace(/\n{2,}/g, '\n\n')
  const baseLang = cleaned.split('\n')[0].replace(/lang1 ?= ?/, '').trim()
  const parallelLang = cleaned.split('\n')[1].replace(/lang2 ?= ?/, '').trim()
  let sents = cleaned.split('\n').slice(3).join('\n').split('\n\n')
  sents = sents.map(sent => sent.split('\n'))
  sents = sents.map(sent => {
    let textID, sentID, language, order, sentence
    let words = []
    let deprels = []
    let alignments = []
    sent.forEach(item => {
      if (item.includes('# sent_id = ')) {
        sentID = item.replace(/# sent_id = /, '').trim()
        language = sentID.replace(/^.+\//, '')
        sentID = sentID.replace(/\/.+$/, '')
        textID = sentID.replace(/-.+$/, '')
        order = sentID.replace(/.+-/, '')
      } else if (item.includes('# text = ')) {
        sentence = item.replace(/# text = /, '').trim()
      } else {
        const itemArr = item.split('\t')
        const wordOrder = itemArr[0]
        const word = itemArr[1]
        const tag = itemArr[3]
        const headNum = itemArr[6] === '0' ? '_' : itemArr[6] // temporary fix for head of 0 (root)
        const headID = sentID + '-' + language + '_' + headNum
        const selfID = sentID + '-' + language + '_' + wordOrder
        const deprel = itemArr[7]
        let alignedIDs = itemArr[9].split(',')
        alignedIDs = alignedIDs.map(id => id.replace(/\/(.+?)#/, '-$1_'))
        alignedIDs = alignedIDs.filter(id => id !== '_')
        words.push({ _key: selfID, order: wordOrder, word: word, tag: tag })
        deprels.push({ _from: headID, _to: selfID, deprel: deprel })
        deprels = deprels.filter(deprel => !deprel._from.includes('__'))
        alignedIDs.forEach(alignedID => {
          const _from = (language === baseLang) ? selfID : alignedID
          const _to = (language === baseLang) ? alignedID : selfID
          alignments.push({ _from: _from, _to: _to })
        })
      }
    })
    return {
      language: language,
      textID: textID,
      _key: sentID,
      order: order,
      sentence: sentence,
      words: words,
      deprels: deprels,
      alignments: alignments
    }
  })
  let newSentsObj = {}
  sents.forEach(sent => {
    const sentObj = { _key: sent._key, order: sent.order, sentence: sent.sentence, words: sent.words }
    if (!newSentsObj[sent.order]) {
      newSentsObj[sent.order] = {
        isEmpty: false,
        textId: sent.textID,
        wordAlignments: sent.alignments,
        deprels: sent.deprels,
        baseLang: baseLang,
        parallelLang: parallelLang
      }
      if (sent.language === baseLang) {
        newSentsObj[sent.order].baseSentence = sentObj
      } else {
        newSentsObj[sent.order].parallelSentence = sentObj
      }
    } else {
      newSentsObj[sent.order].wordAlignments = newSentsObj[sent.order].wordAlignments.concat(sent.alignments)
      newSentsObj[sent.order].deprels = newSentsObj[sent.order].deprels.concat(sent.deprels)
      if (sent.language === baseLang) {
        newSentsObj[sent.order].baseSentence = sentObj
      } else {
        newSentsObj[sent.order].parallelSentence = sentObj
      }
    }
  })
  const keys = Object.keys(newSentsObj).sort((a, b) => parseInt(a) - parseInt(b))
  let newSents = keys.map(key => newSentsObj[key])
  newSents = newSents.map(sent => {
    const emptySentence = {
      isEmpty: true,
      _key: '',
      order: '',
      sentence: '',
      words: []
    }
    if (!sent.parallelSentence) sent.parallelSentence = emptySentence
    if (!sent.baseSentence) sent.baseSentence = emptySentence
    return sent
  })
  return newSents
}
