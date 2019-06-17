<template>
  <div class="salary-container">
    <div class="" v-bind:key="celery.real" v-for="celery in salary">
      <table class="salary-item">
          <tr><th>현재 연봉</th><td>{{celery.now_year}}</td></tr>
          <tr><th>이직할 연봉</th><td>{{celery.next_year}}</td></tr>
          <tr><th>연봉 상승률</th><td>{{celery.rate_of_rise}}%</td></tr>
          <tr><th>연봉 차이</th><td>{{celery.gap_now_year}}</td></tr>
          <tr><th>월급 차이</th><td>{{celery.gap_now_month}}</td></tr>
          <tr><th>현재 연봉 실수령액</th><td>{{celery.now_real}}</td></tr>
          <tr><th>이직 후 예상 실수령액</th><td>{{celery.change_real}}</td></tr>
          <tr><th>실수령 기준 월급차이</th><td>{{celery.gap_real_month}}</td></tr>
          <tr><th>실수령 기준 연봉차이</th><td>{{celery.gap_real_year}}</td></tr>
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
