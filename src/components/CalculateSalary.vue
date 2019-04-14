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
        period: 'year'
      }
      // Send up to parent
      this.$emit('calc-salary', targetSalary);
      this.salary = '';
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