<template>
  <div>
    <van-nav-bar left-arrow @click-left = "onClickLeft">
    </van-nav-bar>
    <van-field label = "消费时间" placeholder = "请选择消费时间" v-model = "updatedTime" right-icon="calender-o" @click-right-icon = "showTime"/>
    <van-field label = "收支类型" placeholder = "请选择收支类型" right-icon="filter-o" @click-right-icon = "showType" v-model = "itemName"/>
    <van-field label = "金额" placeholder = "请输入金额" type = "number" v-model = "costMoney" />
    <van-field label = "备注" placeholder = "请输入备注信息" type = "text" v-model = "note" />
    <van-button class = "submitButton" round type="info" @click = "addRecord (id,updatedTime, costMoney, note, itemId)">
      提交
    </van-button>
    <!-- 时间弹出组件 -->
    <van-popup v-model = "showTimeComponent" position = "bottom">
      <van-datetime-picker v-model = "currentTime" type = "datetime" @cancel = "handleCancel"
        @confirm = "handleConfirm()"/>
    </van-popup>
    <!-- 收支类型选择组件 -->
    <van-popup v-model = "showTypeComponent" position = "bottom">
      <van-radio-group v-model = "itemId">
        <van-cell-group>
          <van-cell :title = "consumTypeItem.label" clickable @click = "handleRadio(consumTypeItem.label)" v-bind:key= "index" v-for = "(consumTypeItem,index) in consumType">
            <van-radio slot = "right-icon" :name = "consumTypeItem.value" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AddRecord',
  data () {
    return {
      updatedTime: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.tag,
      itemId: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.itemId,
      id: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.id,
      reversion: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.reversion,
      itemName: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.itemName,
      costMoney: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.content,
      note: this.$store.state.currentItem == null ? null : this.$store.state.currentItem.note,
      consumType: [],
      showTimeComponent: false,
      showTypeComponent: false,
      currentTime: new Date()
    }
  },
  created: function () {
    this.queryDictionaryInfo()
  },
  methods: {
    showTime () {
      this.showTimeComponent = true
    },
    showType () {
      this.showTypeComponent = true
    },
    onClickLeft () {
      this.$router.push({name: 'Home'})
      this.$router.push({name: 'Home'})
    },
    // 查询字典信息
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
    addRecord (id, updatedTime, costMoney, note, itemId) {
      console.log(updatedTime + ' ' + costMoney + ' ' + note + ' ' + id + ' ' + itemId)
      let financeDetailVo = {
        costMoney: costMoney,
        updatedTime: updatedTime,
        note: note,
        itemId: itemId,
        id: id
      }
      if (id != null) {
        // 修改财务数据
        axios.request({
          url: `/finance/updateFinanceDetail`,
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
      } else {
        // 插入财务数据
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
      }
    },
    handleConfirm () {
      // 获取的时间为时间戳
      this.updatedTime = this.dateFormat('YYYY-mm-dd HH:MM:SS', this.currentTime)
      this.showTimeComponent = false
    },
    handleCancel () {
      this.showTimeComponent = false
    },
    handleRadio (label) {
      this.showTypeComponent = false
      this.itemName = label
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
