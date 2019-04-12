<template>
  <div id="app">
    <div id="nav" class="nav-bar">
      <router-link class="nav-item" tag="div" to="/">Home</router-link> 
      <router-link class="nav-item" tag="div" to="/about">About</router-link> 
      <router-link class="nav-item" tag="div" to="/vuex">vuex</router-link> 
      <router-link class="nav-item" tag="div" to="/vueLazyLoad">vueLazyLoad</router-link>
      <router-link class="nav-item" tag="div" to="/changeTheme">changeTheme</router-link>
      <router-link class="nav-item" tag="div" to="/renderChild">renderChild</router-link>
    </div>
    <div class="contain-view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  padding:20px;
}
 #app .nav-bar{
  flex: 0 0 200px;
  margin-right:20px;
  color: #2c3e50;
}
.nav-item{
  display: flex;
  height:30px;
  cursor: pointer;
}
.contain-view{
  flex:1;
  padding:20px;
  /* background: #2c3e50; */
}
</style>
