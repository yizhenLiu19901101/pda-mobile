<template>
  <div>
    <van-nav-bar left-arrow @click-left = "onClickLeft">
    </van-nav-bar>
    <van-field label = "收支类型" placeholder = "请选择收支类型" v-model = "itemName"/>
    <van-field label = "金额" placeholder = "请输入金额" type = "number" v-model = "costMoney" />
    <van-field label = "备注" placeholder = "请输入备注信息" type = "text" v-model = "note" />
  </div>
</template>
<script>
export default {
  name: 'RecordDetail',
  data () {
    return {
      updatedTime: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.tag,
      itemName: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.itemName,
      costMoney: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.content,
      note: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.note
    }
  },
  methods: {
    onClickLeft () {
      // 清除掉当前数据
      this.$store.commit('changeCurrentItem', null)
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/recordDetail.css">
