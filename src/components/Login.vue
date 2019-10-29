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
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/signin.css">
