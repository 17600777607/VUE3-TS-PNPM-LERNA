/**
 * @cj/scripts 主入口文件
 * 提供统一的工具函数导出
 */

// 从src/api目录重新导出所有工具函数
export * from './src/api/index.js';

// 从src/test目录重新导出所有测试工具函数
export * as testUtils from './src/test/index.js';

/**
 * 主函数 - 作为脚本直接运行时的入口点
 */
async function main() {
  try {
    // 演示API功能
    const { test } = await import('./src/api/index.js');
    const result = test('Hello from @cj/scripts');
    
    console.log('@cj/scripts API测试结果:');
    console.log(result);
    
    // 演示Test工具功能
    const { assert, timeExecution } = await import('./src/test/index.js');
    const assertResult = assert(1 + 1 === 2, '1+1 should equal 2');
    console.log('断言测试结果:', assertResult);
    
    const timingResult = timeExecution(() => {
      // 模拟耗时操作
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      return sum;
    }, '耗时计算测试');
    console.log('计时测试结果:', timingResult);
    
    // 格式化当前时间并显示
    const now = new Date();
    console.log(`当前时间: ${now.toLocaleString('zh-CN')}`);
    console.log('Hello from @cj/scripts');
  } catch (error) {
    console.error('@cj/scripts 运行时错误:', error);
  }
}

// 检测是否直接运行此文件（ES模块兼容方式）
import { fileURLToPath } from 'url';
import path from 'path';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}