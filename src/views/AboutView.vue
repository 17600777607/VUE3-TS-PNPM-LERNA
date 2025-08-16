<template>
  <div class="about">

    <h1>关于我们</h1>
    <p>这是一个展示 Vue Router 路由功能的示例页面</p>
    <p>使用了组件懒加载技术，提高了应用的加载性能</p>
    <nav>
      <router-link to="/">返回首页</router-link>
    </nav>
    <div class="features">
      <div class="feature">
        <h3>Vue 3</h3>
        <p>最新版本的 Vue.js 框架</p>
      </div>
      <div class="feature">
        <h3>TypeScript</h3>
        <p>提供类型安全的开发体验</p>
      </div>
      <div class="feature">
        <h3>Vite</h3>
        <p>快速的构建工具</p>
      </div>
      <div class="feature">
        <h3>Vue Router</h3>
        <p>强大的路由管理</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('AboutView 组件已加载（懒加载）');
});
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.about h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.about p {
  font-size: 1.1em;
  margin-bottom: 30px;
  text-align: center;
}

.about nav {
  margin-bottom: 40px;
}

.about nav a {
  padding: 10px 20px;
  text-decoration: none;
  color: #646cff;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.about nav a:hover {
  background-color: rgba(100, 108, 255, 0.1);
}

.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 600px;
}

.feature {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
}

.feature h3 {
  margin-bottom: 10px;
  color: #646cff;
}

@media (max-width: 600px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>