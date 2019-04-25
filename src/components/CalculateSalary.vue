<template>
  <div>
    <ViewWon v-bind:salary="salary"/>
    <form @submit="caclSalary">
      <input type="text" v-model="salary" name="salary" placeholder="연봉을 입력하세요" :maxlength="max">
      <input type="submit" value="계산" class="btn">
      <p>부양가족<p>
      <input type="text" v-model="family" name="family" />
      <p>20세이하 자녀</p>
      <input type="text" v-model="minor" name="minor" />
      <p>비과세 금액</p>
      <input type="text" v-model="exemption" name="exemption" />
    </form>
  </div>
</template>

<script>
import ViewWon from './ViewWon';
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
      salary: '',
      family: 1,
      minor: 0,
      exemption: 100000
    }
  },
  methods: {
    caclSalary(e) {
      e.preventDefault();
      var salary = this.set_exemption(this.salary);
      var tax = this.calc_simple_tax(salary, this.family, this.minor);
      var local = this.calc_local_tax(tax);
      var pension = this.calc_annuity_insurance_deduction(this.median_income_section(salary))/12;
      var health = this.calc_health_insurance(salary);
      var longterm = this.calc_long_term_insurance(health);   
      var employ = this.calc_employment_insurance(salary); 
      var deducted = tax+local+pension+health+longterm+employ;
      var real = this.salary - deducted;
      const targetSalary = {
        origin: this.salary,
        period: 'month',
        tax: tax,
        local: local,
        pension: pension,
        health : health,
        longterm : longterm,
        employ : employ,
        deducted: deducted,
        real: real
      }
      // Send up to parent
      this.$emit('calc-salary', targetSalary);
      this.salary = '';
    },
    median_income_section(pay){
    var str_pay = pay/1000;
    var median = 0
    if (pay < 1060*CHONWON){
      median = 0
    }else if (pay < 1500*CHONWON){
      if (str_pay - Math.floor(str_pay/10)*10 < 5){
        median = Math.floor(str_pay/10)*10 + 2.5
      }else{
        median = Math.floor(str_pay/10)*10 + 7.5
      }
      median = median * 1000
    }else if (pay < 3000*CHONWON){
      median = Math.floor(str_pay/10)*10 + 5
      median = median * 1000
    }else if (pay < 10000*CHONWON){
      var point = str_pay - Math.floor(str_pay/100)*100
      if (0 <= point < 20){
        median = Math.floor(str_pay/100)*100 + 10
      }else if (20 <= point < 40){
        median = Math.floor(str_pay/100)*100 + 30
      }else if (40 <= point < 60){
        median = Math.floor(str_pay/100)*100 + 50
      }else if (60<= point < 80){
        median = Math.floor(str_pay/100)*100 + 70
      }else{
        median = Math.floor(str_pay/100)*100 + 90
      }
      median = median * CHONWON
    }else{
      median = pay
    }
      return median
    },
    calc_earned_income_deduction(salary){ //근로소득공제
      var amount_deducted = 0;
      if (salary <= 500*MANWON){
        amount_deducted = salary * 0.7;
      }else if (salary <= 1500*MANWON){
        amount_deducted = 350*MANWON + ((salary-500*MANWON) * 0.4);
      }else if (salary <= 4500*MANWON){
        amount_deducted = 750*MANWON + ((salary-1500*MANWON) * 0.15);
      }else if (salary <= 10000*MANWON){
        amount_deducted = 1200*MANWON + ((salary-4500*MANWON) * 0.05);
      }else if (salary > 10000*MANWON){
        amount_deducted = 1475*MANWON + ((salary-10000*MANWON) * 0.02);
      }
      return amount_deducted
    },
    calc_earned_income_amount(salary, amount_deducted){ //근로소득금액
	    var earned_income_amount = salary - amount_deducted;
      return earned_income_amount
    },
    calc_personal_allowance(number_of_people=1, number_of_less_than_twenty=0){ //인적공제
      return (number_of_people+number_of_less_than_twenty) * 150*MANWON
    },
    calc_annuity_insurance_deduction(monthly_salary){ //연금보험료공제
      var annuity_insurance_amount = this.calc_national_pension(monthly_salary) * 12;
      if (monthly_salary <= 30*MANWON){
        annuity_insurance_amount = 15.66*MANWON;
      }else if (monthly_salary >= 448*MANWON){
        annuity_insurance_amount = 242.46*MANWON;
      }
      return annuity_insurance_amount
    },
    special_exemption_one(salary){ //특별 소득 공제
      if (salary <= 3000*MANWON){
        return 310*MANWON + salary*0.04
      }else if (salary <= 4500*MANWON){
        return 310*MANWON + (salary*0.04) - ((salary-3000*MANWON) * 0.05)
      }else if (salary <= 7000*MANWON){
        return 310*MANWON + (salary*0.015)
      }else if (salary <= 12000*MANWON){
        return 310*MANWON + (salary*0.005)
      }
    },
    special_exemption_two(salary){
      if (salary <= 3000*MANWON){
        return 360*MANWON + salary*0.04
      }else if (salary <= 4500*MANWON){
        return 360*MANWON + (salary*0.04) - ((salary-3000*MANWON) * 0.05)
      }else if (salary <= 7000*MANWON){
        return 360*MANWON + (salary*0.02)
      }else if (salary <= 12000*MANWON){
        return 360*MANWON + (salary*0.01)
      }
    },
    special_exemption_multiple(salary){
      var additional_exemption = (salary - 4000*MANWON) * 0.04
      if (salary <= 3000*MANWON){
        return 500*MANWON + salary*0.07 + additional_exemption
      }else if (salary <= 4500*MANWON){
        return 500*MANWON + (salary*0.07) - ((salary-3000*MANWON) * 0.05) + additional_exemption
      }else if (salary <= 7000*MANWON){
        return 500*MANWON + (salary*0.05) + additional_exemption
      }else if (salary <= 12000*MANWON){
        return 500*MANWON + (salary*0.03) + additional_exemption
      }
    },
    calc_special_income_deduction(salary, number_of_people = 1){
      if (number_of_people == 1){
        return this.special_exemption_one(salary)
      }else if (number_of_people == 2){
        return this.special_exemption_two(salary)
      }else if (number_of_people >= 3){
        return this.special_exemption_multiple(salary)
      }
    },
    calc_tax_base(earned_income, personal_allowance, annuity_insurance, special_exemption){ //과세표준
      return earned_income - personal_allowance - annuity_insurance - special_exemption
    },
    calc_tax_assessment(tax_base){ //산출세액
      var temp_tax_base = 0
      if (tax_base <= 1200*MANWON){
        temp_tax_base = tax_base*0.06
      }else if (tax_base <= 4600*MANWON){
        temp_tax_base = 72*MANWON + (tax_base - 1200*MANWON)*0.15
      }else if (tax_base <= 8800*MANWON){
        temp_tax_base = 582*MANWON + (tax_base - 4600*MANWON)*0.24
      }else if (tax_base <= 15000*MANWON){
        temp_tax_base = 1590*MANWON + (tax_base - 8800*MANWON)*0.35
      }else if (tax_base <= 30000*MANWON){
        temp_tax_base = 3760*MANWON + (tax_base - 15000*MANWON)*0.38
      }else if (tax_base <= 50000*MANWON){
        temp_tax_base = 9460*MANWON + (tax_base - 30000*MANWON)*0.4
      }else if (tax_base > 50000*MANWON){
        temp_tax_base = 17460*MANWON + (tax_base - 50000*MANWON)*0.42
      }
      return temp_tax_base - temp_tax_base % 10
    },
    calc_earned_income_tax_credit(tax_assessment, salary){ //근로소득 세액공제
      var tax_credit = 0
      if (tax_assessment <=50*MANWON){
        tax_credit = tax_assessment*0.55;
      }else{
        tax_credit = 27.5*MANWON+(tax_assessment-50*MANWON)*0.3;
      }
      //간이세액표 상 근로소득공제 한도
      if (tax_credit > 66*MANWON){
        if (salary <= 5500*MANWON){
          tax_credit = 66*MANWON;
        }else if (salary <= 7000*MANWON){
          tax_credit = 63*MANWON;
        }else if (salary > 7000*MANWON){
          tax_credit = 50*MANWON;
        }
      }else if (tax_credit > 63*MANWON){
        if (salary <= 7000*MANWON){
          tax_credit = 63*MANWON;
        }else if (salary > 7000*MANWON){
          tax_credit = 50*MANWON;
        }
      }else if (tax_credit > 50*MANWON){
        if (salary > 7000*MANWON){
          tax_credit = 50*MANWON;
        }
      }
      return tax_credit - tax_credit % 10
    },
    calc_finalized_tax_amount(tax_base, tax_credit){ //결정세액
      return tax_base-tax_credit
    },
    calc_ease_tax_amount(finalized_tax_amount){ //간이세액
      var temp_amount = finalized_tax_amount/12;
      return temp_amount - temp_amount % 10
    },
    calc_national_pension(monthly_salary){ //국민연금
	    var trimmed_salary = monthly_salary - (monthly_salary % 1000);
	    var pension_share = trimmed_salary * 0.045;
      return pension_share - pension_share % 10
    },
    calc_health_insurance(monthly_salary){ //건강보험
	    var health_insurance = monthly_salary * 0.0646 * 0.5;
      return health_insurance - health_insurance % 10
    },
    calc_long_term_insurance(health_insurance){ //장기요양보험료
	    var long_term_insurance = health_insurance * 0.0851;
      return long_term_insurance - long_term_insurance % 10
    },
    calc_employment_insurance(monthly_salary){ //고용보험
	    var employment_insurance = monthly_salary * 0.0065;
      return employment_insurance - employment_insurance % 10
    },
    calc_local_tax(tax){
      var local_income_tax = tax * 0.1;
      return local_income_tax - local_income_tax % 10    
    },
    calc_simple_tax(salary, family=1, minor=0){
      family *= 1;
      minor *= 1;
      console.log(salary)
      salary = this.median_income_section(salary)
      console.log(salary)
      var annuity_insurance = this.calc_annuity_insurance_deduction(salary);
      console.log(annuity_insurance);
      salary = salary * 12
      var earned_income_deduction = this.calc_earned_income_deduction(salary);
      console.log(earned_income_deduction)
      var earned_income_amount = this.calc_earned_income_amount(salary, earned_income_deduction);
      console.log(earned_income_amount)
      var personal_allowance = this.calc_personal_allowance(family, minor); // 가족, 20세미만
      console.log(personal_allowance)
      var special_income_deduction = this.calc_special_income_deduction(salary, family); //가족공제
      console.log(special_income_deduction)
      var tax_base = this.calc_tax_base(earned_income_amount, personal_allowance, annuity_insurance, special_income_deduction);
      console.log(tax_base)
      var tax_assessment = this.calc_tax_assessment(tax_base);
      console.log(tax_assessment)
      var tax_credit = this.calc_earned_income_tax_credit(tax_assessment, salary);
      console.log(tax_credit)
      var finalized_tax_amount = this.calc_finalized_tax_amount(tax_assessment, tax_credit);
      var tax = this.calc_ease_tax_amount(finalized_tax_amount);
      return tax
    },
    set_exemption(salary){
      var exemption = this.exemption;
      if((salary-exemption) > 1060000){
        salary = salary - exemption;
      }
      return salary
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