<template>
    <div>
        公共头部
        <router-view></router-view>
        公共底部
       <el-time-select
  v-model="value"
  :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
  placeholder="选择时间">
</el-time-select>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                value:2
            }
        }
    }
</script>

<style scoped>

</style>