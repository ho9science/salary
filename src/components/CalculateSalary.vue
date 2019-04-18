<template>
  <div>
    <form @submit="caclSalary">
      <input type="text" v-model="salary" name="salary" placeholder="연봉을 입력하세요">
      <input type="submit" value="계산" class="btn">
    </form>
  </div>
</template>

<script>
export default {
  name: "CalculateSalary",
  data() {
    return {
      salary: ''
    }
  },
  methods: {
    caclSalary(e) {
      e.preventDefault();
      const targetSalary = {
        salary: this.salary,
        period: 'month',
        pension: this.calc_national_pension(this.salary),
        health : this.calc_health_insurance(this.salary),
        longterm : this.calc_long_term_insurance(this.calc_health_insurance(this.salary)),
        employment : this.calc_employment_insurance(this.salary)
      }
      // Send up to parent
      this.$emit('calc-salary', targetSalary);
      this.salary = '';
    },
    calc_national_pension(monthly_salary){ //국민연금
	    var trimmed_salary = monthly_salary - (monthly_salary % 1000)
	    var pension_share = trimmed_salary * 0.045
      return pension_share - pension_share % 10
    },
    calc_health_insurance(monthly_salary){ //건강보험
	    var health_insurance = monthly_salary * 0.0646 * 0.5
      return health_insurance - health_insurance % 10
    },
    calc_long_term_insurance(health_insurance){ //장기요양보험료
	    var long_term_insurance = health_insurance * 0.0851 * 0.5
      return long_term_insurance - long_term_insurance % 10
    },
    calc_employment_insurance(monthly_salary){ //고용보험
	    var employment_insurance = monthly_salary * 0.0065
      return employment_insurance - employment_insurance % 10
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