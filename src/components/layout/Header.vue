<template>
  <header class="header">
    <div class="nav">
      <router-link to="/">연봉.kr</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.nav{
  padding: 5% 0 5% 5%;
  font-size: 30px;
  font-weight: 600;
}
  .header {
    color: #fff;
    height:100px;
    width: 1024px;
    min-width: 1024px !important;
    left: 50%;
    margin-left: -512px;
    position:fixed;
    top:0;
  }
  .header a {
    color: #fff;
    padding-right: 5px;
    text-decoration: none;
  }
</style>