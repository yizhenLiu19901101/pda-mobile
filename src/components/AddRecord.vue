<template>
  <div>
    <mt-header>
      <router-link to = "/home" slot = "left">
        <mt-button icon = "back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field label = "时间" placeholder = "请选择消费时间" v-model = "updatedTime" >
      <img class = "logo" src='../assets/calendar.png' alt = "写一笔" v-on:click.prevent = "openPicker"/>
    </mt-field>
    <mt-radio title = "收支类型" :options = 'consumType' v-model = "itemId"/>
    <mt-field label = "金额" placeholder = "请输入金额" type = "number" v-model = "costMoney" />
    <mt-field label = "备注" placeholder = "请输入备注信息" type = "text" v-model = "note" />
    <mt-button class = "submitButton" type = "primary" v-on:click.prevent = "addRecord (updatedTime, costMoney, note, itemId)">
      提交
    </mt-button>
    <!-- 时间组件 -->
    <mt-datetime-picker
      v-model = "updatedTime"
      type = "datetime"
      ref = "picker"
      year-format = "{value} 年"
      month-format = "{value} 月"
      date-format = "{value} 日"
      hour-format = "{value} 时"
      minute-format ="{value} 分"
      @confirm = "handleConfirm"
      :startDate = "startDate"
    ></mt-datetime-picker>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AddRecord',
  data () {
    return {
      startDate: new Date(),
      updatedTime: null,
      itemId: null,
      costMoney: null,
      note: null,
      consumType: []
    }
  },
  created: function () {
    this.queryDictionaryInfo()
  },
  methods: {
    queryDictionaryInfo () {
      axios.get('/dictionary/queryDictionaryByToken', {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.consumType = response.data.body
          console.log(JSON.stringify(this.consumType))
        } else {
          this.$message.error(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    // 添加财务记录
    addRecord (updatedTime, costMoney, note, itemId) {
      console.log(updatedTime + ' ' + costMoney + ' ' + note + ' ' + itemId)
      let financeDetailVo = {
        costMoney: costMoney,
        updatedTime: updatedTime,
        note: note,
        itemId: itemId
      }
      axios.request({
        url: `/finance/insertFinanceDetail`,
        data: financeDetailVo,
        headers: {
          'token': this.$store.state.token
        },
        method: 'put'
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 跳转到首页
          this.$router.push({name: 'Home'})
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      // 获取的时间为时间戳
      this.updatedTime = this.dateFormat('YYYY-mm-dd HH:MM:SS', data)
      // 时间格式转换
      console.log(this.updatedTime)
    },
    dateFormat (fmt, date) {
      let ret
      const opt = {
        // 年
        'Y+': date.getFullYear().toString(),
        // 月
        'm+': (date.getMonth() + 1).toString(),
        // 日
        'd+': date.getDate().toString(),
        // 时
        'H+': date.getHours().toString(),
        // 分
        'M+': date.getMinutes().toString(),
        // 秒
        'S+': date.getSeconds().toString()
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/addRecord.css">
