<template>
  <light-timeline :items = 'items'>
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
          <van-button square type="primary" text="详情" @click = "detail(item)" />
        </template>
        <van-cell :border = "false" :title = "item.itemName + ' ' + item.content" />
        <template slot = "right">
          <van-button square type="danger" text = "编辑"  @click = "edit(item)" />
          <van-button square type="primary" text = "删除" @click = "remove(item)"/>
        </template>
      </van-swipe-cell>
    </template>
  </light-timeline>
</template>
<script>
import axios from 'axios'
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
    // 查看详情
    detail (item) {
      this.$store.commit('changeCurrentItem', item)
      console.log(JSON.stringify(this.$store.state.currentItem))
      // 跳转到添加记录的页面
      this.$router.push({name: 'RecordDetail'})
    },
    // 编辑
    edit (item) {
      this.$store.commit('changeCurrentItem', item)
      console.log(JSON.stringify(this.$store.state.currentItem))
      // 跳转到添加记录的页面
      this.$router.push({name: 'AddRecord'})
    },
    // 删除
    remove (item) {
      let targetItem = {
        id: item.id,
        reversion: item.reversion
      }
      axios.delete('/finance/deleteFinanceDetail', {
        data: targetItem,
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          console.log(response.data.msg)
          // 重新获取目标数据
          axios.get('/finance/getDetailDate/1', {
            headers: {
              'token': this.$store.state.token
            }
          }).then(function (response) {
            // eslint-disable-next-line
            if (response.data.code == 200) {
              // 将token值赋值给全局变量
              this.$store.commit('changeItems', response.data.body)
              this.items = response.data.body
              console.log(JSON.stringify(this.items))
            }
          }.bind(this))
            .catch(function (error) {
              console.log(error)
            })
        } else {
          this.$message.error(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/myTimeLine.css">
