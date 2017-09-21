<template>
<div class="page-container">
  <div class="banner">
    <div id="logo">
      <span id="pine">Pine</span><span id="oak">Oak</span>
    </div>
    <div class="banner-elem">
      <span>Edit and visualize parallel dependency treebanks</span>
    </div>
  </div>
  <div class="content-container">
    <div id="sentences-container">
      <!-- <p style="margin-bottom:20px;">
          <button>create new sentence</button>
        </p> -->
      <ul id="sentences-list">
      </ul>
    </div>
    <div id="handle"></div>
    <div id="editor-container">
      <div id="editorToolbar">
        <a @click="saveEditorValue">SAVE</a>
      </div>
      <div id="editor"></div>
    </div>
  </div>
</div>
</template>

<script>
const d3 = require('d3')
const { drawD3 } = require('../js/drawD3')
const { conll } = require('../js/conll')
const { conllToJson } = require('../js/conllToJson')
const ace = require('brace')
require('brace/mode/perl')
require('brace/theme/iplastic')
require('brace/ext/searchbox')
const Split = require('split.js')
const { drawGutterGrip } = require('../js/gutterGrip')

export default {
  name: 'Editor',
  data () {
    return {
      showModal: false,
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
    editor.selection.moveTo(0, 0)

    drawD3(this.sentences, this.drawConfig)

    Split(['#sentences-container', '#editor-container'], {
      sizes: [50, 50],
      minSize: [100, 52],
      gutterSize: 10,
      direction: 'horizontal',
      cursor: 'col-resize'
    })

    drawGutterGrip()

    this.enableHover()

    console.log('Everything mounted!')
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
    saveEditorValue () {
      const editor = ace.edit('editor')
      const newConll = editor.getValue()
      this.conll = newConll
      editor.$blockScrolling = Infinity
      editor.selection.moveTo(0, 0)
      drawD3(this.sentences, this.drawConfig)
      this.enableHover()
    },
    enableHover () {
      // Word Group and Alignments hover-highlighting
      d3.selectAll('g.wordGroup')
        .on('mouseenter', function () {
          d3.select(this).select('rect').classed('word-box-hover', true)
          const _from = d3.select(this).attr('word-id')
          const alignmentsFrom = d3.selectAll('.alignmentPath[_from="' + _from + '"]')
          const alignmentsTo = d3.selectAll('.alignmentPath[_to="' + _from + '"]')
          alignmentsFrom.classed('alignment-hover', true)
          alignmentsTo.classed('alignment-hover', true)
          alignmentsFrom.each(function (d, i) {
            d3.select('g[word-id="' + d._to + '"]')
              .select('rect').classed('word-box-hover', true)
            d3.select('g[word-id="' + d._from + '"]')
              .select('rect').classed('word-box-hover', true)
            // reverse paths
            d3.selectAll('.alignmentPath[_to="' + d._to + '"]')
              .classed('alignment-hover', true)
            // reverse aligned words
            d3.selectAll('.alignmentPath[_to="' + d._to + '"]').each(function (d, i) {
              d3.select('g[word-id="' + d._from + '"]')
                .select('rect').classed('word-box-hover', true)
            })
          })
          alignmentsTo.each(function (d, i) {
            d3.select('g[word-id="' + d._to + '"]')
              .select('rect').classed('word-box-hover', true)
            d3.select('g[word-id="' + d._from + '"]')
              .select('rect').classed('word-box-hover', true)
            // reverse paths
            d3.selectAll('.alignmentPath[_from="' + d._from + '"]')
              .classed('alignment-hover', true)
            // reverse aligned words
            d3.selectAll('.alignmentPath[_from="' + d._from + '"]').each(function (d, i) {
              d3.select('g[word-id="' + d._to + '"]')
                .select('rect').classed('word-box-hover', true)
            })
          })
        })
        .on('mouseleave', function () {
          d3.select(this).select('rect').classed('word-box-hover', false)
          let _from = d3.select(this).attr('word-id')
          let alignmentsFrom = d3.selectAll('.alignmentPath[_from="' + _from + '"]')
          let alignmentsTo = d3.selectAll('.alignmentPath[_to="' + _from + '"]')
          alignmentsFrom.classed('alignment-hover', false)
          alignmentsTo.classed('alignment-hover', false)
          alignmentsFrom.each(function (d, i) {
            d3.select('g[word-id="' + d._to + '"]')
              .select('rect').classed('word-box-hover', false)
            d3.select('g[word-id="' + d._from + '"]')
              .select('rect').classed('word-box-hover', false)
            // reverse paths
            d3.selectAll('.alignmentPath[_to="' + d._to + '"]')
              .classed('alignment-hover', false)
            // reverse aligned words
            d3.selectAll('.alignmentPath[_to="' + d._to + '"]').each(function (d, i) {
              d3.select('g[word-id="' + d._from + '"]')
                .select('rect').classed('word-box-hover', false)
            })
          })
          alignmentsTo.each(function (d, i) {
            d3.select('g[word-id="' + d._to + '"]')
              .select('rect').classed('word-box-hover', false)
            d3.select('g[word-id="' + d._from + '"]')
              .select('rect').classed('word-box-hover', false)
            // reverse paths
            d3.selectAll('.alignmentPath[_from="' + d._from + '"]')
              .classed('alignment-hover', false)
            // reverse aligned words
            d3.selectAll('.alignmentPath[_from="' + d._from + '"]').each(function (d, i) {
              d3.select('g[word-id="' + d._to + '"]')
                .select('rect').classed('word-box-hover', false)
            })
          })
        })

      // Deprel hover-highlighting
      d3.selectAll('.deprelBox')
        .on('mouseenter', function () {
          d3.select(this).classed('deprel-box-hover', true)
          d3.select(this.parentNode).select('text').classed('deprel-text-hover', true)
          d3.select(this.parentNode).select('.pathLine').classed('deprel-line-hover', true)
          d3.select(this.parentNode).select('.pathArrow').classed('deprel-arrow-hover', true)
          const _from = d3.select(this.parentNode).attr('_from')
          const _to = d3.select(this.parentNode).attr('_to')
          const _fromNode = d3.select('g[word-id="' + _from + '"]')
          const _toNode = d3.select('g[word-id="' + _to + '"]')
          _fromNode.select('rect').classed('deprel-wordbox-hover', true)
          _fromNode.select('text.word').classed('deprel-word-hover', true)
          _fromNode.select('text.tag').classed('deprel-tag-hover', true)
          _toNode.select('rect').classed('deprel-wordbox-hover', true)
          _toNode.select('text.word').classed('deprel-word-hover', true)
          _toNode.select('text.tag').classed('deprel-tag-hover', true)
        })
        .on('mouseleave', function () {
          d3.select(this).classed('deprel-box-hover', false)
          d3.select(this.parentNode).select('text').classed('deprel-text-hover', false)
          d3.select(this.parentNode).select('.pathLine').classed('deprel-line-hover', false)
          d3.select(this.parentNode).select('.pathArrow').classed('deprel-arrow-hover', false)
          const _from = d3.select(this.parentNode).attr('_from')
          const _to = d3.select(this.parentNode).attr('_to')
          const _fromNode = d3.select('g[word-id="' + _from + '"]')
          const _toNode = d3.select('g[word-id="' + _to + '"]')
          _fromNode.select('rect').classed('deprel-wordbox-hover', false)
          _fromNode.select('text.word').classed('deprel-word-hover', false)
          _fromNode.select('text.tag').classed('deprel-tag-hover', false)
          _toNode.select('rect').classed('deprel-wordbox-hover', false)
          _toNode.select('text.word').classed('deprel-word-hover', false)
          _toNode.select('text.tag').classed('deprel-tag-hover', false)
        })
      d3.selectAll('.deprelText')
        .on('mouseenter', function () {
          d3.select(this).classed('deprel-text-hover', true)
          d3.select(this.parentNode).select('.deprelBox').classed('deprel-box-hover', true)
          d3.select(this.parentNode).select('.pathLine').classed('deprel-line-hover', true)
          d3.select(this.parentNode).select('.pathArrow').classed('deprel-arrow-hover', true)
          const _from = d3.select(this.parentNode).attr('_from')
          const _to = d3.select(this.parentNode).attr('_to')
          const _fromNode = d3.select('g[word-id="' + _from + '"]')
          const _toNode = d3.select('g[word-id="' + _to + '"]')
          _fromNode.select('rect').classed('deprel-wordbox-hover', true)
          _fromNode.select('text.word').classed('deprel-word-hover', true)
          _fromNode.select('text.tag').classed('deprel-tag-hover', true)
          _toNode.select('rect').classed('deprel-wordbox-hover', true)
          _toNode.select('text.word').classed('deprel-word-hover', true)
          _toNode.select('text.tag').classed('deprel-tag-hover', true)
        })
        .on('mouseleave', function () {
          d3.select(this).classed('deprel-text-hover', false)
          d3.select(this.parentNode).select('.deprelBox').classed('deprel-box-hover', false)
          d3.select(this.parentNode).select('.pathLine').classed('deprel-line-hover', false)
          d3.select(this.parentNode).select('.pathArrow').classed('deprel-arrow-hover', false)
          const _from = d3.select(this.parentNode).attr('_from')
          const _to = d3.select(this.parentNode).attr('_to')
          const _fromNode = d3.select('g[word-id="' + _from + '"]')
          const _toNode = d3.select('g[word-id="' + _to + '"]')
          _fromNode.select('rect').classed('deprel-wordbox-hover', false)
          _fromNode.select('text.word').classed('deprel-word-hover', false)
          _fromNode.select('text.tag').classed('deprel-tag-hover', false)
          _toNode.select('rect').classed('deprel-wordbox-hover', false)
          _toNode.select('text.word').classed('deprel-word-hover', false)
          _toNode.select('text.tag').classed('deprel-tag-hover', false)
        })
    }
  }
}
</script>

<style>
#pine {
  font-size: 2em;
  font-weight: 500;
  color: var(--acorn-green-M1);
}

#oak {
  font-size: 2em;
  font-weight: 500;
  color: var(--acorn-brown-D1);
}

#logo {
  display: inline-block;
}

.sentenceBkg {
  background-color: var(--pine-green-L1);
  border: 1px var(--acorn-green-M1) solid;
  border-radius: 0.5em;
  margin: 0 15px;
  padding: 30px;
  overflow-x: scroll;
}

#sentences-container {
  min-width: 100px;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

#sentences-list {
  text-align: left;
  font-size: 1.1em;
  padding-top: 15px;
}

#sentences-list li {
  margin-bottom: 15px;
}

.deprelText {
  font-size: 13.8px;
  font-family: Arial, Tahoma, sans-serif;
}

#editor-container {
  height: 100%;
  min-width: 50px;
  width: 100%;
  overflow: scroll;
}

#editorToolbar {
  position: fixed;
  top: 70px;
  right: 0;
  height: 23px;
  text-align: left;
  z-index: 5;
}

#editorToolbar > a {
  color: var(--acorn-brown-D2);
  margin: 0;
  padding: 1px 8px;
  font-size: 10pt;
  background-color: orange;
  border: 1px orange solid;
  border-radius: 0;
  opacity: 0.85;
}

#editor {
  height: 100%;
  min-width: 50px;
  overflow: scroll;
}

.gutter {
  background-color: var(--acorn-gray-M1);
  opacity: 0.8;
  cursor: col-resize;
}
</style>
