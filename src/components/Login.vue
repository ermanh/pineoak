<template>
  <div class="page-container">
    <div class="login">
      <h1>
        <span style="color:var(--pine-green-M2);">Pine</span><span style="color:var(--acorn-brown-D1);">Oak</span>
      </h1>
      <img src="../assets/logo.png" style="margin-bottom:15px;">
      <form @submit.prevent="onSubmit">
          <ul>
            <li>
              <input type="text" id="username" name="username" placeholder="username">
            </li>
            <li>
              <input type="password" id="password" name="password" placeholder="password">
            </li>
          </ul>
          <button>Login</button> 
          <button disabled>Sign up</button>
          <!-- <p>About time we think about those pesky zebras jacking up the vest prices and lengthening the queues.</p>
          <p>How's some Íslenka for you, Rejkyavík. Háfn.</p>
          <p>我知道你要幹嘛</p> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'PineOak'
    }
  },
  methods: {
    onSubmit () {
      location.href = '/projects'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 3em;
}
label { 
  padding: 5px;
  margin: 0 0 -1px;
  border: 1px var(--acorn-gray-L2) solid;
  border-radius: 0.2em;
  font-size: 1em;
  color: var(--acorn-gray-D1);
  width: 200px;
}
input {
  padding: 8px 12px;
  margin: 0px auto -1px;
  border: 1px var(--acorn-gray-L2) solid;
  border-radius: 0.2em;
  font-size: 1em;
  color: var(--acorn-gray-D1);
}
button {
  margin-top: 12px;
}
button:hover {
  padding: 5px 8px;
  margin: 8px 0;
  font-size: 1em;
  color: var(--oak-green-D1);
  background-color: var(--pine-green-U1);
  border-radius: 0.35em;
  border: 1px var(--oak-green-D1) solid;
}
.login {
  width: 550px;
  height: 500px;
  margin: 0 auto;
  padding: 35px;
  background-color: var(--acorn-green-L1); /* #bfccae; */
  border-radius: 1em;
}
.frontpage {
  background-color: var(--pine-brown-M2b);
}
</style>
