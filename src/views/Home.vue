<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <RealSalary v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import RealSalary from '../components/RealSalary';
import AddTodo from '../components/AddTodo';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    RealSalary,
    AddTodo
  },
  data() {
    return {
      todos: [
        {
          userId: 1,
          id: 11,
          title: 'samdasu',
          completed: false,
          salary: 36000000,
          pension: 90000,
          health: 60000,
          longterm: 10000,
          employ: 2000,
          real: 3000000,
          tax: 12000,
          local: 1200,
          exemption: 100000
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