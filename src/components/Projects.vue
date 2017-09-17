<template>
  <div class="page-container">
    <h1>Projects</h1>
    <div id="projects-container">
      <ul id="projects-list">
        <a class="project-item" v-for="project in projects" :href="'projects/'+project.path+'/'">
          <li>{{ project.name }}</li>
        </a>
        <a id="add-item" @click="showModal=true">
          <li>+ create new project</li>
        </a>
      </ul>
    </div>
    <div class="modal is-active" id="project-modal" v-if="showModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Create new project
          </p>
          <button class="delete" @click="showModal=false"></button>
        </header>
        <form id="add-project" action="#" method="POST" @submit.prevent="onSubmit">
        <section class="modal-card-body">
          <ul>
            <li>
              <label for="name">* Project name</label>
              <input type="text" id="name" name="name" placeholder="required" v-model="form.name">
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
import { Form } from './projectsForm'
export default {
  name: 'projects',
  data () {
    return {
      showModal: false,
      msg: 'PineOak Projects',
      projects: [
        {name: 'Wiyot UD', path: 'Wiyot-UD', base: 'Wiyot', parallel: 'English'},
        {name: 'Yurok UD', path: 'Yurok-UD', base: 'Yurok', parallel: 'English'}
      ],
      form: new Form({
        name: '',
        path: '',
        base: '',
        parallel: ''
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
          this.projects.push(data)
          this.showModal = false
        })
        .catch(err => alert(err))
    }
  }
}
</script>

<style scoped>

label {
  display: inline-block;
  width: 160px;
  margin: 0 -6px -1px;
  padding: 8px 10px 5px;
  border: 1px var(--acorn-gray-L2) solid;
  border-radius: 0.25em 0 0 0.25em;
  text-align: right;
  background-color: var(--pine-green-C1);
  color: var(--oak-green-D1);
  font-weight: bold;
}

input {
  min-width: 300px;
  padding: 8px 12px;
  margin: 0px auto -1px;
  border: 1px var(--acorn-gray-L2) solid;
  border-radius: 0 0.25em 0.25em 0;
  font-size: 1em;
  color: var(--acorn-gray-D1);
}

button {
  width: 85px;
}

button.delete {
  width: 25px;
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

#projects-container {
    max-width: 500px;
    margin: 0 auto;
}

#projects-list {
    text-align: center;
}
</style>

