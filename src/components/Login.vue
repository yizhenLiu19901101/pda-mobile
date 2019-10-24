<template>
  <div class="hello">
     <button v-on:click="logout()">返回</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$router.push({name: 'HelloWorld'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
