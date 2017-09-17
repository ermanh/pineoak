<template>
  <div class="page-container">
    <h1>{{ pathNameClean }} Texts</h1>
    <div id="texts-container">
      <ul id="texts-list">
        <a class="text-item" v-for="text in texts" :href="text.path+'/'">
          <li>{{ text.name }}</li>
        </a>
        <a id="add-item" @click="showModal=true">
          <li>+ create new text</li>
        </a>
      </ul>
    </div>
    <div class="modal is-active" id="text-modal" v-if="showModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Create new text
          </p>
          <button class="delete" @click="showModal=false"></button>
        </header>
        <form id="add-project" action="#" method="POST" @submit.prevent="onSubmit">
        <section class="modal-card-body">
          <ul>
            <li>
              <label for="name">* Text name </label>
              <input type="text" id="name" name="name" placeholder="required" v-model="form.name">
            </li>
            <li style="margin-top: 10px;">
              <label for="base-text" class="label-textarea">Primary text </label>
              <span class="label-space"></span>
            </li>
            <li>
              <textarea type="textarea" id="primary-text" name="primary-text" placeholder="optional" v-model="form.primaryText"></textarea>
            </li>
            <li>
              <label for="parallel-text" class="label-textarea">Parallel text </label>
              <span class="label-space"></span>
            </li>
            <li>
              <textarea type="textarea" id="parallel-text" name="parallel-text" placeholder="optional" v-model="form.parallelText" style="margin-bottom:-8px"></textarea>
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
import { Form } from './projectsForm'
export default {
  name: 'texts',
  data () {
    return {
      msg: 'PineOak Texts',
      pathName: this.$route.params.name,
      pathNameClean: this.$route.params.name.replace(/-/g, ' '),
      showModal: false,
      texts: [
        {name: 'Sentences', path: 'Sentences'},
        {name: 'Lunar Eclipse', path: 'Lunar-Eclipse'},
        {name: 'Acorn Mush I', path: 'Acorn-Mush-I'}
      ],
      form: new Form({
        name: '',
        path: '',
        primaryText: '',
        parallelText: ''
      })
    }
  },
  methods: {
    createPath (name) {
      return name.replace(/ /g, '-')
    },
    onSubmit () {
      this.form.submit('post', 'projects')
        .then(data => {
          alert('Handling it!')
          data.path = this.createPath(data.name)
          this.texts.push(data)
          this.showModal = false
        })
        .catch(err => alert(err))
    }
  }
}
</script>


<style>
label {
  display: inline-block;
  width: 112px;
  margin: 0 -6px -1px;
  padding: 8px 10px 5px;
  border: 1px var(--acorn-gray-L2) solid;
  border-radius: 0.25em 0 0 0.25em;
  text-align: right;
  background-color: var(--pine-green-C1);
  color: var(--oak-green-D1);
  font-weight: bold;
}

.label-space {
  width: 300px;
  display: inline-block;
}

.label-textarea {
  margin: 5px 0 -1px;
  border-radius: 0.25em 0.25em 0 0;
}

input, textarea {
  min-width: 300px;
  padding: 8px 12px;
  margin: 0px auto -1px;
  border: 1px var(--acorn-gray-L2) solid;
  border-radius: 0 0.25em 0.25em 0;
  font-size: 1em;
  color: var(--acorn-gray-D1);
}

textarea {
  width: 412px;
  border-radius: 0 0.25em 0.25em 0.25em;
  margin: 0px 5px 0 0;
}

button {
  width: 85px;
}

li {
  margin: 5px;
  padding: 12px 20px;
  background-color: var(--acorn-green-L1);
  border-radius: 0.5em;
}

.modal-card-body li {
  margin: 0;
  padding: 0;
  background-color: white;
}

#texts-container {
  max-width: 500px;
  margin: 0 auto;
}

#texts-list {
  text-align: center;
}

</style>

