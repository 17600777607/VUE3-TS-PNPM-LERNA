<script setup lang="ts">
// App.vue 作为路由容器
</script>

<template>
  <div id="app">
    <!-- 路由视图，用于显示当前路由对应的组件 -->
    <router-view />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
