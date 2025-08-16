<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <p>这是一个使用 Vue 3 + TypeScript + Vite + Vue Router 的示例项目</p>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于我们</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/vue.svg" class="home-logo" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('HomeView 组件已加载');
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.home h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.home p {
  font-size: 1.2em;
  margin-bottom: 30px;
  text-align: center;
}

.home nav {
  margin-bottom: 40px;
}

.home nav a {
  margin: 0 15px;
  padding: 10px 20px;
  text-decoration: none;
  color: #646cff;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.home nav a:hover {
  background-color: rgba(100, 108, 255, 0.1);
}

.home-logo {
  height: 150px;
  width: auto;
}
</style>