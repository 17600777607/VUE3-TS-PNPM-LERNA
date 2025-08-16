/**
 * 测试工具模块
 * 提供各种测试辅助函数
 */

/**
 * 测试断言函数
 * @param condition 测试条件
 * @param message 错误消息
 * @returns 测试结果
 */
export function assert(condition: boolean, message?: string): { success: boolean; message?: string } {
  if (!condition) {
    return {
      success: false,
      message: message || 'Assertion failed'
    };
  }
  return {
    success: true
  };
}

/**
 * 计时函数 - 测量代码执行时间
 * @param func 要测量的函数
 * @param label 标签
 * @returns 执行结果和耗时
 */
export function timeExecution<T>(func: () => T, label?: string): { result: T; durationMs: number; label?: string } {
  const start = performance.now();
  const result = func();
  const durationMs = performance.now() - start;
  
  return {
    result,
    durationMs,
    label
  };
}

/**
 * 测试运行器
 * @param tests 测试用例对象
 * @returns 测试结果摘要
 */
export function runTests(tests: Record<string, () => boolean | Promise<boolean>>): Promise<{
  passed: number;
  failed: number;
  total: number;
  results: Record<string, { passed: boolean; error?: Error }>;
}> {
  const results: Record<string, { passed: boolean; error?: Error }> = {};
  let passed = 0;
  let failed = 0;
  const total = Object.keys(tests).length;
  
  const testPromises = Object.entries(tests).map(async ([name, testFn]) => {
    try {
      const result = await testFn();
      if (result) {
        passed++;
        results[name] = { passed: true };
      } else {
        failed++;
        results[name] = { passed: false };
      }
    } catch (error) {
      failed++;
      results[name] = { 
        passed: false, 
        error: error instanceof Error ? error : new Error(String(error)) 
      };
    }
  });
  
  return Promise.all(testPromises).then(() => ({
    passed,
    failed,
    total,
    results
  }));
}

/**
 * 生成随机测试数据
 * @param type 数据类型
 * @param options 选项
 * @returns 随机生成的数据
 */
export function generateTestData(
  type: 'string' | 'number' | 'boolean' | 'array' | 'object',
  options?: Record<string, any>
): any {
  const config = {
    stringLength: 10,
    numberMin: 0,
    numberMax: 100,
    arrayLength: 5,
    ...options
  };
  
  switch (type) {
    case 'string':
      return Math.random().toString(36).substring(2, 2 + config.stringLength);
    case 'number':
      return Math.floor(Math.random() * (config.numberMax - config.numberMin + 1)) + config.numberMin;
    case 'boolean':
      return Math.random() > 0.5;
    case 'array':
      return Array.from({ length: config.arrayLength }, () => 
        generateTestData('string', { stringLength: 5 })
      );
    case 'object':
      const obj: Record<string, any> = {};
      for (let i = 0; i < 3; i++) {
        obj[`key${i}`] = generateTestData('string', { stringLength: 8 });
      }
      return obj;
    default:
      return null;
  }
}