<template>
  <div class="salary-container">
    <div class="" v-bind:key="celery.real" v-for="celery in salary">
      <table class="salary-item">
          <tr><th>현재 연봉</th><td>{{celery.now_year}}</td></tr>
          <tr><th>예상 연봉</th><td>{{celery.next_year}}</td></tr>
          <tr><th>연봉 상승률</th><td>{{celery.rate_of_rise}}%</td></tr>
          <tr><th>연봉 차이</th><td>{{celery.gap_now_year}}</td></tr>
          <tr><th>월급 차이</th><td>{{celery.gap_now_month}}</td></tr>
          <tr><th>현재 연봉 실수령액</th><td>{{celery.now_real}}</td></tr>
          <tr><th>예상 연봉 실수령액</th><td>{{celery.next_real}}</td></tr>
          <tr><th>실수령 기준 월급차이</th><td>{{celery.gap_real_month}}</td></tr>
          <tr><th>실수령 기준 연봉차이</th><td>{{celery.gap_real_year}}</td></tr>
          <tr><th>이직 후 예상 실수령액</th><td>{{celery.change_real}}</td></tr>
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
  font-size:20px;
}
th,
td {
  text-align: left;
  padding: 0.4em 0.6em;
}
.salary-container{
  margin: 0 auto;
  width: 360px;
  background-color: black;
  opacity: 0.6;
}

</style>
