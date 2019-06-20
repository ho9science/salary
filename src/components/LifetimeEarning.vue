<template>
    <div class="salary-container">
    <div class="" v-bind:key="celery.real" v-for="celery in salary">
      <table class="salary-item">
          <tr><th>누적 연봉</th><td>{{celery.now_year}}</td><th>예상 누적 연봉</th><td>{{celery.next_year}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*2}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*2}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*3}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*3}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*4}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*4}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*5}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*5}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*6}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*6}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*7}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*7}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*8}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*8}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*9}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*9}}</td></tr>
          <tr><th>누적 연봉</th><td>{{celery.now_year*10}}</td><th>예상 누적 연봉</th><td>{{celery.next_year*10}}</td></tr>
          
          <tr><th>실수령액 차이</th><td>{{celery.next_year*10 - celery.now_real*10}}</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    name: "LifetimeEarning",  
    props: ["salary"]
}
</script>


<style>

</style>



