<template>
  <div>
    <div class="todo-item" v-bind:key="todo.id" v-for="todo in todos">
      <table>
          <tr><th>공제액</th><td>{{todo.exemption}}</td></tr>
          <tr><th>국민연금</th><td>{{todo.pension}}</td></tr>
          <tr><th>건강보험</th><td>{{todo.health}}</td></tr>
          <tr><th>장기요양보험</th><td>{{todo.longterm}}</td></tr>
          <tr><th>고용보험</th><td>{{todo.employ}}</td></tr>
          <tr><th>소득세</th><td>{{todo.tax}}</td></tr>
          <tr><th>지방세</th><td>{{todo.local}}</td></tr>
          <tr><th>실수령액</th><td>{{todo.real}}</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RealSalary",  
  props: ["todos"]
}
</script>

<style scoped>
</style>