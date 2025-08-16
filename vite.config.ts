import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 路径别名配置 - 与TypeScript中的paths配置对应
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
