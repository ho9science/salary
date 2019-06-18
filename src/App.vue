<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header';
export default {
  name:"app",
  components: {
    Header
  }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&amp;subset=korean');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Nanum Gothic', sans-serif;
    line-height: 1.4;
    color: #fff;
    background-color:#9966ff;
    overflow: hidden;
    width:100%;
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