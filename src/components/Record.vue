<template>
  <div class="page-navbar">
    <van-tabs class = "page-part" v-model = "currentTag" @click = "change">
      <van-tab v-for = "(tag,index) in tagList" v-bind:key = "index"
      :id = "tag" :title = 'tag.menuName'>
      </van-tab>
    </van-tabs>
    <span v-if = "currentTag == 0">
      <div class = "logo_div">
        <van-icon name = "edit" style = "margin-top: 1rem;margin-left: 0.1rem;" alt = "写一笔" v-on:click = "addRecord" size = "2rem" color = "#606c76"/>
      </div>
      <my-time-line :items = 'items'/>
    </span>
    <span v-if = "currentTag == 1">
      <div style = "margin-top: 5%">
        <van-tabs v-model = "consumeType" type = "card" style = "width: 60%;margin: 0 auto" @click = "changeConsumeType">
          <van-tab title = "总支出" name = "2" />
          <van-tab title = "总收入" name = "3" />
          <van-tab title = "净收入" name = "4" />
        </van-tabs>
       </div>
      <ring :data = "chartData" :legend-visible = "false" :settings = "chartSettings" :graphic = "graphic" />
    </span>
  </div>
</template>
<script>
import axios from 'axios'
import Ring from 'v-charts/lib/ring'
import MyTimeLine from '../components/MyTimeLine'

export default {
  // 名称
  name: 'Record',
  components: {
    Ring,
    MyTimeLine
  },
  data () {
    return {
      consumeType: 1,
      menuId: this.$store.state.currentMenu,
      tagList: this.$store.state.tagList,
      currentTag: this.$store.state.tagList[0].menuId,
      items: this.$store.state.items,
      title: this.$store.state.items.sum == null ? null : this.$store.state.items.sum,
      chartData: {
        columns: ['item', 'money'],
        rows: []
      },
      chartSettings: {
        offsetY: 200,
        radius: [60, 80],
        // 设置延长线的长度
        labelLine: {
          normal: {
            // 设置延长线的长度
            length: 30,
            // 设置第二段延长线的长度
            length2: 40
          }
        }
      },
      graphic: [{
        type: 'text',
        left: 'center',
        top: '46%',
        style: {
          text: '121',
          textAlign: 'center',
          fill: '#999999',
          fontSize: 21,
          color: '#4d4f5c'
        }
      }]
    }
  },
  methods: {
    change (index) {
      let val = this.tagList[index]
      // 查询目标数据
      this.queryData(val.menuId - 7)
    },
    // 修改收支类型
    changeConsumeType (index) {
      // 查询目标数据
      this.queryData(index)
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
            this.chartData.rows = response.data.body.detail
            this.graphic[0].style.text = response.data.body.sum
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
