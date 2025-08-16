/**
 * API工具类统一导出文件
 * 提供所有工具函数的集中访问点
 */

/**
 * 测试方法 - 用于验证API调用
 * @param message 可选的测试消息
 * @returns 包含测试信息的对象
 */
export function test(message?: string): { success: boolean; timestamp: string; message: string } {
  return {
    success: true,
    timestamp: new Date().toISOString(),
    message: message || 'API test successful!'
  };
}

/**
 * API工具类版本信息
 */
export const VERSION = '1.0.1';

/**
 * API工具类配置选项接口
 */
export interface ApiConfig {
  debug?: boolean;
}

/**
 * 全局API配置对象
 */
export const apiConfig: ApiConfig = {
  debug: false
};

/**
 * 更新API配置
 * @param config 配置选项
 */
export function updateApiConfig(config: Partial<ApiConfig>): void {
  Object.assign(apiConfig, config);
  
  if (apiConfig.debug) {
    console.log('@cj/scripts API配置已更新:', apiConfig);
  }
}