<template>
  <light-timeline :items='items'>
    <template slot = 'tag' slot-scope ='{ item }'>
      <span style = 'margin-left: -1rem'>{{item.tag}}</span>
    </template>
    <template slot = 'symbol' slot-scope ='{ item }'>
      <img class = "circle" src = "../assets/sun.png" v-if = "item.type === 'circle'" />
      <img class = "circle" src = "../assets/moon.png" v-if = "item.type === 'star'" />
    </template>
    <template slot = 'content' slot-scope = '{ item }'>
      <van-swipe-cell>
        <template slot="left">
          <van-button square type="primary" text="详情" />
        </template>
        <van-cell :border = "false" :title = "item.itemName + ' ' + item.content" />
        <template slot = "right">
          <van-button square type="danger" text = "编辑" />
          <van-button square type="primary" text = "删除"/>
        </template>
      </van-swipe-cell>
    </template>
  </light-timeline>
</template>
<script>
export default {
  name: 'MyTimeLine',
  data () {
    return {
      items: this.$parent.items
    }
  },
  created () {
    console.log('myTimeLine' + JSON.stringify(this.items))
    this.rightButtons = [
      {
        content: 'Mark as Unread',
        style: { background: 'lightgray', color: '#fff' }
      },
      {
        content: 'Delete',
        style: { background: 'red', color: '#fff' },
        handler: () => this.$messagebox('delete')
      }
    ]
  },
  methods: {
    leftButtonHandler (evt) {
      console.log(123)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/myTimeLine.css">
