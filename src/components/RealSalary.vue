<template>
  <div>
    <div class="todo-item" v-bind:key="celery.real" v-for="celery in salary">
      <table>
          <tr><th>세전수령액</th><td>{{celery.origin}}</td></tr>
          <tr><th>실수령액</th><td>{{celery.real}}</td></tr>
          <tr><th>국민연금</th><td>{{celery.pension}}</td></tr>
          <tr><th>건강보험</th><td>{{celery.health}}</td></tr>
          <tr><th>장기요양보험</th><td>{{celery.longterm}}</td></tr>
          <tr><th>고용보험</th><td>{{celery.employ}}</td></tr>
          <tr><th>소득세</th><td>{{celery.tax}}</td></tr>
          <tr><th>지방세</th><td>{{celery.local}}</td></tr>
          <tr><th>공제액</th><td>{{celery.deducted}}</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RealSalary",  
  props: ["salary"]
}
</script>

<style scoped>
</style>
