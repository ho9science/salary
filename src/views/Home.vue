<template>
<div>
    <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section">
      <div id="app" class="container">
      <CalculateSalary v-on:calc-salary="calcSalary" />
      </div>
    </div>
    <div class="section">
      <RealSalary v-bind:salary="salary" />
    </div>
    <div class="section">
      <LifetimeEarning v-bind:salary="salary"/>
    </div>
  </full-page>
</div>
</template>

<script>
import LifetimeEarning from '../components/LifetimeEarning';
import RealSalary from '../components/RealSalary';
import CalculateSalary from '../components/CalculateSalary';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    RealSalary,
    CalculateSalary,
    LifetimeEarning
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
         
        }
      ],
      options: {
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3']
      },

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
      this.salary = [targetSalary];
      
    }
  }
}
</script>

<style>
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
  .container{
  margin-right: auto;
  margin-left: auto;
  margin-top:40px;
}
@media (min-width: 1024px){
.container {
  max-width: 1024px;
}
}
@media (min-width: 360px){
.container {
  min-width: 360px;
}
}
</style>