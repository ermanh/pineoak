<template>
  <div class="page-container" style="margin-right:500px;">
    <h1>{{ textNameClean }}</h1>
    <div id="sentences-container">
      <!-- <p style="margin-bottom:20px;">
        <button>create new sentence</button>
      </p> -->
      <ul id="sentences-list">
      </ul>
    </div>
    <div id="editorContainer">
      <div id="editorToolbar">
        <a href="#" @click="getEditorValue">SAVE</a>
        <a href="#">VIEW INVISIBLE CHARS</a>
      </div>
      <div id="editor"></div>
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
// const d3 = require('d3')
const { drawD3 } = require('../js/drawD3')
const { conll } = require('../js/conll')
const { conllToJson } = require('../js/conllToJson')
const ace = require('brace')
require('brace/mode/perl')
require('brace/theme/iplastic')
export default {
  name: 'sentences',
  data () {
    return {
      showModal: false,
      textName: this.$route.params.text,
      textNameClean: this.$route.params.text.replace(/-/g, ' '),
      msg: 'PineOak Sentences',
      conll: conll,
      sentenceAlignments: [ // must be queried separately
        { _from: '1_wiy', _to: '1_eng', _key: 'sa1' }
      ],
      drawConfig: {
        mainSentenceHeight: 25,
        firstDeprelHeight: 35,
        singleDeprelHeight: 23,
        singleLineHeight: 20,
        nextLineStart: 23,
        lineWordProperties: 2,
        widthBetweenWords: 10,
        alignmentsHeight: 80,
        treetopSpace: 10,
        fontSpec: 'bold 1.6em Avenir',
        tagFontSpec: 'normal 10pt Avenir',
        deprelFontSpec: 'bold 13.8px Arial',
        deprelTextHeight: 10,
        deprelBoxRadius: 2,
        textColor: 'var(--acorn-gray-D1)',
        tagColor: '#2a6596' // darker steelblue
      }
    }
  },
  computed: {
    sentences: function () {
      return conllToJson(this.conll)
    }
  },
  mounted: function () {
    const editor = ace.edit('editor')
    editor.setAutoScrollEditorIntoView(true)
    editor.getSession().setUseSoftTabs(false)
    editor.getSession().setMode('ace/mode/perl')
    editor.setOption('showInvisibles', false)
    editor.$blockScrolling = Infinity
    editor.setTheme('ace/theme/iplastic')
    editor.setValue(this.conll)
    // editor.selection.moveTo(0, 0)

    drawD3(this.sentences, this.drawConfig)
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
    },
    getEditorValue () {
      const editor = ace.edit('editor')
      const newConll = editor.getValue()
      this.conll = newConll
      drawD3(this.sentences, this.drawConfig)
    }
  }
}
</script>

<style>
.sentenceBkg {
  background-color: var(--pine-green-L1);
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
#editorContainer {
  border: 1px var(--acorn-gray-L1) solid;
  resize: both;
  position: fixed;
  top: 25px;
  right: 25px;
  bottom: 25px;
  width: 500px;
}
#editorToolbar {
  height: 8px;
  text-align: left;
}
#editorToolbar > a {
  color: var(--acorn-brown-D2);
  margin: 0;
  padding: 3px 8px;
  font-size: 10pt;
  background-color: orange; 
}
#editor {
  top: 15px;
  height: 100%;
  width: 100%;
}
</style>
