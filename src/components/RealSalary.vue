<template>
  <div class="salary-container">
    <div class="" v-bind:key="celery.real" v-for="celery in salary">
      <table class="salary-item">
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
.salary-item{  
  overflow: auto;
    max-width: 100%;
    background:
        linear-gradient(to right, white 30%, rgba(255,255,255,0)),
        linear-gradient(to right, rgba(255,255,255,0), white 70%) 0 100%,
        radial-gradient(farthest-side at 0% 50%, rgba(0,0,0,.2), rgba(0,0,0,0)),
        radial-gradient(farthest-side at 100% 50%, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
    background-repeat: no-repeat;
    background-color: white;
    background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-position: 0 0, 100%, 0 0, 100%;
    background-attachment: local, local, scroll, scroll;
}
tr {
  border-bottom: 1px solid #000;
}
th,
td {
  text-align: left;
  padding: 0.5em 1em;
}
.salary-container{
  margin:auto;
}

</style>
