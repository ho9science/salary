<template>
  <div>
    
    <form @submit="caclSalary">
      <label for="now_salary">현직장 연봉</label>
      <ViewWon v-bind:salary="now_salary"/>
      <input type="text" v-model="now_salary" id="now_salary" name="now_salary" placeholder="연봉을 입력하세요" :maxlength="max">
      <label for="next_salary">이직할 연봉</label>
      <ViewWon v-bind:salary="next_salary"/>
      <input type="text" v-model="next_salary" id="next_salary" name="next_salary" placeholder="연봉을 입력하세요" :maxlength="max">
      <input type="number" v-model="time" name="time" min="1" max="12">
      <button type="submit">계산</button>
    </form>
  </div>
</template>

<script>
import ViewWon from './ViewWon';
import kosimpletax from 'kosimpletax';
const MANWON = 10000
const CHONWON = 1000
export default {
  name: "CalculateSalary",
  components: {
    ViewWon
  },
  data() {
    return {
      max: 12,
      time: 1,
      now_salary: 0,
      next_salary: 0,
      year_real: 0
    }
  },
  methods: {
    caclSalary(e) {
      e.preventDefault();
      
      var now_salary = this.now_salary;
      var now_real = kosimpletax.realsalary(now_salary);
      var next_salary = this.next_salary;
      var next_real = kosimpletax.realsalary(next_salary);
      var time = this.time;
      var next_time = 13-time;
      var now_time = 12-next_time;
      var now_monthly = now_real/ 12;
      var next_monthly = next_real/ 12;
      var gap_now_year = next_salary - now_salary;
      var gap_now_month = Math.round(next_salary/12 - now_salary/12);
      var gap_real_month = Math.round(next_monthly - now_monthly);
      var change_real = Math.round(now_monthly * now_time + next_monthly * next_time);
      var gap_real_year = change_real - now_real;
      var temp_of_rise = (next_salary/now_salary-1) * 100;
      var rate_of_rise = temp_of_rise - temp_of_rise % 10;
      const targetSalary = {
        now_year: now_salary,
        next_year: next_salary,
        now_real: now_real,
        change_real: change_real,
        gap_real_year : gap_real_year,
        gap_real_month : gap_real_month,
        gap_now_year: gap_now_year,
        gap_now_month: gap_now_month,
        rate_of_rise: rate_of_rise
      }
      // Send up to parent
      this.$emit('calc-salary', targetSalary);
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
  }
  input[type="text"] {
    flex: 10;
    padding: 5px;
  }
  input[type="submit"] {
    flex: 2;
  }
</style>