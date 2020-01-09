<template>
  <div class="page-navbar">
    <van-tabs class = "page-part" v-model = "currentTag" @click = "change">
      <van-tab v-for = "(tag,index) in tagList" v-bind:key = "index"
      :id = "tag" :title = 'tag.menuName'>
      </van-tab>
    </van-tabs>
    <span v-if = "currentTag == 0">
      <div class = "logo_div">
        <img class = "logo" src='../assets/editor.png' alt = "写一笔" v-on:click = "addRecord"/>
      </div>
      <my-time-line :items = 'items'/>
    </span>
    <span v-if = "currentTag == 1">
      <ve-pie :data = "chartData" :legend-visible = "false"></ve-pie>
    </span>
  </div>
</template>
<script>
import axios from 'axios'
import VePie from 'v-charts/lib/pie'
import MyTimeLine from '../components/MyTimeLine'
export default {
  // 名称
  name: 'Record',
  components: {
    VePie,
    MyTimeLine
  },
  data () {
    return {
      menuId: this.$store.state.currentMenu,
      tagList: this.$store.state.tagList,
      currentTag: this.$store.state.tagList[0].menuId,
      items: this.$store.state.items,
      chartData: {
        columns: ['item', 'money'],
        rows: []
      }
    }
  },
  methods: {
    change (index) {
      let val = this.tagList[index]
      // 查询目标数据
      this.queryData(val.menuId - 7)
    },
    // 查询财务数据
    queryData (queryType) {
      axios.get('/finance/getDetailDate/' + queryType, {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          if (queryType === 1) {
            this.$store.commit('changeItems', response.data.body)
            console.log(JSON.stringify(this.items))
          } else {
            this.chartData.rows = response.data.body
            console.log(JSON.stringify(this.chartData.rows))
          }
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    // 跳转到添加记录页面
    addRecord () {
      this.$router.push({name: 'AddRecord'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/record.css">
