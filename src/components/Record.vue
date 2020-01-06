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
      <ve-line :data = "chartData"></ve-line>
    </span>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
export default {
  // 名称
  name: 'Record',
  components: {
    VeLine
  },
  data () {
    return {
      menuId: this.$store.state.currentMenuId,
      tagList: this.$store.state.tagList,
      selected: this.$store.state.tagList[0],
      items: [
        {
          tag: '2019-02-12',
          content: '测试内容'
        },
        {
          tag: '2019-02-13',
          type: 'circle',
          content: '练习内容'
        }
      ],
      chartData: {
        columns: ['日期', '销售量'],
        rows: [
          {'日期': '1月1日', '销售量': 123},
          {'日期': '1月2日', '销售量': 1223},
          {'日期': '1月3日', '销售量': 2123},
          {'日期': '1月4日', '销售量': 4123},
          {'日期': '1月5日', '销售量': 3123},
          {'日期': '1月6日', '销售量': 7123}
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/record.css">
