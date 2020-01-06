<template>
  <div class="page-navbar">
    <mt-navbar class="page-part" v-model = "selected">
      <mt-tab-item v-for="(tag,index) in tagList" v-bind:key = "index"
      :id = "tag">
        {{tag.menuName}}
      </mt-tab-item>
    </mt-navbar>
    <span v-if="selected.menuId == 8">
      <light-timeline :items = 'items'/>
    </span>
    <span v-if="selected.menuId == 9">
      <ve-pie :data = "chartData"></ve-pie>
    </span>
  </div>
</template>
<script>
import axios from 'axios'
import VePie from 'v-charts/lib/pie'
export default {
  // 名称
  name: 'Record',
  components: {
    VePie
  },
  data () {
    return {
      menuId: this.$store.state.currentMenuId,
      tagList: this.$store.state.tagList,
      selected: this.$store.state.tagList[0],
      items: [],
      chartData: {
        columns: ['item', 'money'],
        rows: []
      }
    }
  },
  watch: {
    selected: function (val) {
      // 查询目标数据
      this.queryData(val.menuId - 8)
    }
  },
  created: function () {
    // 查询明细数据
    this.queryData(0)
  },
  methods: {
    queryData (queryType) {
      axios.get('/finance/getDetailDate/' + queryType, {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          if (queryType === 0) {
            this.items = response.data.body
            console.log(JSON.stringify(this.items))
          } else {
            this.rows = response.data.body
            console.log(JSON.stringify(this.rows))
          }
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
<style scoped src="../style/record.css">
