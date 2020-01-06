<template>
  <light-timeline :items='items'>
    <template slot='tag' slot-scope='{ item }'>
      {{item.date}}
    </template>
    <template slot='symbol' slot-scope='{ item }'>
      <div class="my_icon_class"><i :class="item.class"></i></div>
    </template>
    <template slot='content' slot-scope='{ item }'>
      {{item.content}}
    </template>
  </light-timeline>
</template>
<script>
export default {
  name: 'MyTimeLine',
  data () {
    return {
      items: [
        {
          date: '2018-01-12',
          content: 'hallo',
          class: 'star'
        }
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/myTimeLine.css">
