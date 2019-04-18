<template>
  <div id="app">
    <CalculateSalary v-on:calc-salary="calcSalary" />
    <RealSalary v-bind:salary="salary" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import RealSalary from '../components/RealSalary';
import CalculateSalary from '../components/CalculateSalary';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    RealSalary,
    CalculateSalary
  },
  data() {
    return {
      todos: [
        {
          userId: 1,
          id: 11,
          title: 'samdasu',
          completed: false
        }
      ],
      salary: [
        {
          origin: 2500000,
          pension: 90000,
          health: 60000,
          longterm: 10000,
          employ: 2000,
          real: 3000000,
          tax: 12000,
          local: 1200,
          total: 220000
        }
      ]

    }
  },
  methods: {
    deleteTodo(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
        .catch(err => console.log(err));
    },
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      axios.post('https://jsonplaceholder.typicode.com/todos/', {
        title,
        completed
      })
        .then(res => this.todos = [...this.todos, res.data])
        .catch(err => console.log(err));
    },
    calcSalary(targetSalary) {
    console.log(targetSalary);
     
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
  .btn:hover {
    background: #666;
  }
</style>