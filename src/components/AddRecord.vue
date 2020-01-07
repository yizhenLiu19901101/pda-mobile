<template>
  <div>
    <mt-header>
      <router-link to = "/home" slot = "left">
        <mt-button icon = "back"></mt-button>
      </router-link>
    </mt-header>
    <mt-form>
        <mt-field label = "时间" placeholder = "请选择消费时间" type = "datetime" v-model = "updatedTime" />
        <mt-radio title = "收支类型" v-model = "itemId" options = "consumType" />
        <mt-field label = "金额" placeholder = "请输入金额" type = "number" v-model = "constMoney" />
        <mt-field label = "备注" placeholder = "请输入备注信息" type = "text" v-model = "note" />
        <mt-btn title = "提交" type = "primary" v-on:click.prevent = "addRecord(updatedTime,constMoney,note,itemId)"></mt-btn>
    </mt-form>
  </div>
</template>
<script>
export default {
  name: 'AddRecord',
  data () {
    return {
      consumType: [{
        label: 'optionA',
        value: 'valueA'
      },
      {
        label: 'optionB',
        value: 'valueB'
      }]
    }
  },
  methods: {
    // 添加财务记录
    addRecord (updatedTime, constMoney, note, itemId) {
      console.log(updatedTime + ' ' + constMoney + ' ' + note + ' ' + itemId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/addRecord.css">
