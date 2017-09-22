<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
:root {
  --acorn-green-L1: #c3dca5; /* rgb(195,220,165) */
  --acorn-green-L2: #b4cb7d; /* rgb(180,203,125) */
  --acorn-green-M1: #8eaf68; /* rgb(142,175,104) */
  --acorn-green-M2: #80a862; /* rgb(128,168,98) */
  --acorn-green-D1: #47722b; /* rgb(71,114,43) */
  --acorn-green-D2: #3d642d; /* rgb(61,100,45) */
  --acorn-brown-L1: #ecd5c7; /* rgb(236,213,199) */
  --acorn-brown-L2: #e5cbb2; /* rgb(229,203,178) */
  --acorn-brown-M1: #f0ada5; /* rgb(240,173,165) */
  --acorn-brown-M2: #b99573; /* rgb(185,149,115) */
  --acorn-brown-D1: #ae6449; /* rgb(174,100,73) */
  --acorn-brown-D2: #713626; /* rgb(113,54,38) */
  --acorn-gray-L1: #cfd4da; /* rgb(207,212,218) */
  --acorn-gray-L2: #9ea8b1; /* rgb(158,168,177) */
  --acorn-gray-M1: #7a7687; /* rgb(122,118,135) */
  --acorn-gray-M2: #555259; /* rgb(85,82,89) */
  --acorn-gray-D1: #333136; /* rgb(51,49,54) */
  --acorn-gray-D2: #1c1d1f; /* rgb(28,29,31) */
  --oak-green-U1: #c4ffa3; /* rgb(98,36,100) */
  --oak-green-L1: #7ac119; /* rgb(122,193,25) */
  --oak-green-M1: #579b44; /* rgb(87,155,68) */
  --oak-green-D1: #366c20; /* rgb(54,108,32) */
  --pine-green-U1: #f4f5e7; /* rgb(64,6,96) */
  --pine-green-U2: #edf0db; /* rgb(69,9,94) */
  --pine-green-C1: #d7f1c9; /* rgb(99,16,95) */
  --pine-green-L1: #bfccae; /* rgb(191,204,174) */
  --pine-green-L2: #b2b5a4; /* rgb(178,181,164) */
  --pine-green-M1: #7f8a62; /* rgb(127,138,98) */
  --pine-green-M2: #62703b; /* rgb(98,112,59) */
  --pine-green-D1: #3a4024; /* rgb(58,64,36) */
  --pine-green-D2: #2e321b; /* rgb(46,50,27) */
  --pine-brown-L1: #ffcf99; /* rgb(255,207,153) */
  --pine-brown-L2: #eaaf83; /* rgb(234,175,131) */
  --pine-brown-M1a: #d08c43; /* rgb(208,140,67) */
  --pine-brown-M2a: #a46137; /* rgb(164,97,55) */
  --pine-brown-M1b: #5f3930; /* rgb(95,57,48) */
  --pine-brown-M2b: #4f2c2b; /* rgb(79,44,38) */
  --pine-brown-D1: #7a3d2a; /* rgb(122,61,42) */
  --pine-brown-D2: #561d0a; /* rgb(86,29,10} */
}

h1 {
  color: var(--acorn-gray-M2);
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 15px;
}

ul {
  padding: 0;
  list-style-type: none;
}

a {
  text-decoration: none;
  color: var(--oak-green-D1);
  font-weight: bold;
}

a:hover {
  color: white;
}

a:hover li {
  background-color: var(--oak-green-M1);
}

button {
  padding: 5px 8px;
  margin: 8px 0;
  font-size: 1em;
  color: white;
  background-color: var(--oak-green-M1);
  border-radius: 0.35em;
  border: 1px var(--oak-green-M1) solid;
}

.banner {
  height: 70px;
  margin: 0;
  padding: 15px;
  background-color: var(--acorn-gray-D1);
  text-align: left;
}

.banner-elem {
  display: inline;
  padding: 12px;
  color: var(--acorn-gray-L1);
  font-size: 1.2em;
  white-space: nowrap;
  padding-left: 15px;
}

.page-container {
  height: 100vh;
  width: 100vw;
}

.content-container {
  display: block;
  position: fixed;
  text-align: center;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  /* xtouch-action: none; */
}

.modal-card-body {
  padding: 35px 0;
}

.modal-card-body li {
  background-color: white;
}

.modal-card-foot div {
  margin: 0 auto;
  text-align: center;
}

.modal-card-foot button {
  width: 100px;
  margin: 0 5px 0 0;
  background-color: var(--acorn-brown-L1);
  border: 1px var(--acorn-brown-D1) solid;
  color: var(--acorn-brown-D1);
}

.modal-card-foot button:hover {
  margin: 0 5px 0 0;
  background-color: var(--acorn-brown-D1);
  border: 1px var(--acorn-brown-D1) solid;
  color: var(--acorn-brown-L1);
}

#app {
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale; 
  text-align: center; 
  color: #2c3e50;
  /* background-color: var(--acorn-brown-M2); */
}

#add-item {  
  text-decoration: none;
  color: var(--acorn-brown-D2);
  font-weight: bold;
}

#add-item:hover, #add-item li:hover {
  color: white;
  background-color: salmon;
}

#add-item li {
  background-color: var(--acorn-brown-M1);
}

.word-box-hover {
  fill: #ffee3a;
  stroke: #ef6909;
  stroke-width: 1.5px;
}
.word-box-clicked {
  stroke: #ef6909!important;
  fill: #ef6909!important;
  stroke-width: 1.5px!important;
}
.word-text-clicked {
  fill: white!important;
}
.word-tag-clicked {
  fill: white!important;
}

.alignment-hover {
  stroke: #ef6909;
  stroke-width: 1.8px;
}
.alignment-clicked {
  stroke: #ef6909;
  stroke-width: 1.8px!important;
}

.deprel-box-hover, .deprel-arrow-hover {
  fill: darkcyan;
  stroke: darkcyan;
  stroke-width: 1.65px;
  /* z-index: 1001; */
}
.deprel-box-clicked, .deprel-arrow-clicked {
  fill: steelblue!important;
  stroke: steelblue!important;
  stroke-width: 1.65px!important;
}

.deprel-text-hover {
  fill: white;
  /* z-index: 1002; */
}
.deprel-text-clicked {
  fill: white!important;
}

.deprel-line-hover {
  stroke: darkcyan;
  stroke-width: 1.65px;
  /* z-index: 1000; */
}
.deprel-line-clicked {
  stroke: steelblue!important;
  stroke-width: 1.65px!important;
}

.deprel-wordbox-hover {
  fill: #d3eeff;
  stroke: darkcyan;
  stroke-width: 1.5px;
}
.deprel-wordbox-clicked {
  fill: steelblue!important;
  stroke: steelblue!important;
  stroke-width: 1.5px!important;
}

.deprel-word-clicked {
  fill: white!important;
}

.deprel-tag-clicked {
  fill: var(--acorn-gray-L1)!important;
}
</style>
