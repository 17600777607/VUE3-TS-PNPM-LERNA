import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// 清理之前的构建产物
if (fs.existsSync('./dist')) {
  fs.rmSync('./dist', { recursive: true, force: true });
}

// 创建临时构建目录
const tempDir = './temp';
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log('开始TypeScript编译...');
// 编译到临时目录
try {
  execSync('tsc --outDir temp', { stdio: 'inherit' });
  console.log('TypeScript编译成功！');
} catch (error) {
  console.error('TypeScript编译失败:', error);
  process.exit(1);
}

// 创建最终的dist目录
fs.mkdirSync('./dist', { recursive: true });

// 处理index.js文件，修改导入路径
const indexJsPath = path.join(tempDir, 'index.js');
if (fs.existsSync(indexJsPath)) {
  let content = fs.readFileSync(indexJsPath, 'utf-8');
  
  // 修改导入路径
  content = content
    .replace(/\.\/src\/api\/index\.js/g, './api.js')
    .replace(/\.\/src\/test\/index\.js/g, './test.js');
  
  fs.writeFileSync(path.join('./dist', 'index.js'), content, 'utf-8');
  console.log('已更新index.js中的导入路径');
}

// 处理index.d.ts文件
const indexDtsPath = path.join(tempDir, 'index.d.ts');
if (fs.existsSync(indexDtsPath)) {
  fs.copyFileSync(indexDtsPath, path.join('./dist', 'index.d.ts'));
  console.log('已复制index.d.ts文件');
}

// 移动api和test文件
const srcDir = path.join(tempDir, 'src');
if (fs.existsSync(srcDir)) {
  const subDirs = fs.readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  subDirs.forEach(dirName => {
    const dirPath = path.join(srcDir, dirName);
    const jsFilePath = path.join(dirPath, 'index.js');
    const dtsFilePath = path.join(dirPath, 'index.d.ts');

    if (fs.existsSync(jsFilePath)) {
      fs.copyFileSync(jsFilePath, path.join('./dist', dirName + '.js'));
      console.log(`已复制${jsFilePath}到${path.join('./dist', dirName + '.js')}`);
    }

    if (fs.existsSync(dtsFilePath)) {
      fs.copyFileSync(dtsFilePath, path.join('./dist', dirName + '.d.ts'));
      console.log(`已复制${dtsFilePath}到${path.join('./dist', dirName + '.d.ts')}`);
    }
  });
}

// 清理临时目录
fs.rmSync(tempDir, { recursive: true, force: true });
console.log('构建完成！');
console.log('构建产物位于dist目录');