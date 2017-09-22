/* jshint esversion:6 */

export function textToConll (raw) {
  if (!/convert *= *true/.test(raw)) return raw

  const punctRE = new RegExp(/([`~!@#$%^&*()_+-=[\]\\{};:'",./?]|\.\.\.)/g)
  const divider = '\n---------- enter treebank data below ----------\n\n'

  if (raw === '' || !raw) return ''
  let cleaned = raw.replace(/\r/g, '').trim()
  cleaned = cleaned.replace(/\n{2,}/g, '\n\n')
  let split
  if (!cleaned.includes('-----')) {
    split = ['', cleaned]
  } else {
    split = cleaned.replace(/-{5,}([\w '"\\/_+-]*?-{5,})?\n*/, '*%^%*').split('*%^%*')
  }

  let configs = 'lang1 = lang\nlang2 = '

  const lang1 = 'lang'
  // let lang1 = configs.match(/lang1 *= *.*$/) ? configs.match(/lang1 *= *.*$/).replace(/lang1 *= */, '') : null
  // if (!lang1) lang1 = 'lang'
  if (split[1].trim() === '') return configs + divider
  const text = split[1]
  let sents = text.trim().split('\n')
  sents = sents.map((sent, index) => {
    let newsent = sent.replace(punctRE, ' $1 ')
    newsent = newsent.replace(/ {2,}/g, ' ')
    newsent = newsent.trim().split(' ')

    let conllBlock = '# sent_id = text-' + (index + 1).toString() + '/' + lang1 + '\n'
    conllBlock += '# text = ' + sent + '\n'
    newsent.forEach((word, index) => {
      conllBlock += (index + 1).toString() + '\t' + word + '\t_\t_\t_\t_\t_\t_\t_\t_\n'
    })
    return conllBlock
  })
  const conllAll = sents.join('\n')
  if (lang1 !== 'lang') configs = 'lang1 = ' + lang1 + '\nlang2 = '
  return configs + divider + conllAll
}

console.log(textToConll('I am afraid.\nI am petrified.\n'))
