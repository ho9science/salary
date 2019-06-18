<template>
  <div class="calc-header">
    <form @submit="caclSalary">
      <div>
        <label for="now_salary">현직장 연봉</label>
      <ViewWon v-bind:salary="now_salary"/>
      <input type="text" v-model="now_salary" id="now_salary" name="now_salary" placeholder="연봉을 입력하세요" :maxlength="max">
      </div>
      <div>
      <label for="next_salary">이직할 연봉</label>
      <ViewWon v-bind:salary="next_salary"/>
      <input type="text" v-model="next_salary" id="next_salary" name="next_salary" placeholder="연봉을 입력하세요" :maxlength="max">
      </div>
      <div>
        <button type="submit">계산</button>
      </div>
      <div claiss="slider-box">        
        <SliderMonth         
        @sliderValue="getTime"/>
      </div>
    </form>
  </div>
</template>

<script>
import ViewWon from './ViewWon';
import SliderMonth from './SliderMonth';
import kosimpletax from 'kosimpletax';
const MANWON = 10000
const CHONWON = 1000
export default {
  name: "CalculateSalary",
  components: {
    ViewWon,
    SliderMonth
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
      var gap_real_year = next_real - now_real;
      console.log(time)
      var rate_of_rise = ((next_salary/now_salary-1) * 100).toFixed(2);
      const targetSalary = {
        now_year: now_salary,
        next_year: next_salary,
        now_real: now_real,
        next_real: next_real,
        change_real: change_real,
        gap_real_year : gap_real_year,
        gap_real_month : gap_real_month,
        gap_now_year: gap_now_year,
        gap_now_month: gap_now_month,
        rate_of_rise: rate_of_rise
      }
      // Send up to parent
      this.$emit('calc-salary', targetSalary);
    },
    getTime(time){
      this.time = time;
    }
  }
}
</script>

<style scoped>
  .calc-header{
    margin-top:12%;
    padding: 5% 5% 3% 5%;
  }
  input[type="text"] {
    flex: 10;
    padding: 5px;
  }
  input[type="submit"] {
    flex: 2;
  }
</style>