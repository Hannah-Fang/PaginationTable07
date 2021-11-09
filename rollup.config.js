import { nodeResolve } from '@rollup/plugin-node-resolve';
// 將 CommonJS 模組轉換至 ES6 以讓 Rollup 進行處理
import commonjs from '@rollup/plugin-commonjs';
// 支援 Babel 進行編譯處理
import { babel } from '@rollup/plugin-babel';
// 將 json 文件轉換 為ES6 模組
import json from '@rollup/plugin-json';
// 路徑別名
import alias from '@rollup/plugin-alias';
// 將打包的檔案進行 minify 處理 (只支援ES6)
// import { terser } from 'rollup-plugin-terser';
import path from 'path';

// 輸出的檔案名稱
const fileName = 'index';
// 套件命名
const pluginName = 'ActivityTimeline';
// 引用檔
const entryFile = 'src/index.js';
// Node.js  - 解析檔案路徑
const pathResolve = (p) => path.resolve(__dirname, p);

module.exports = [
  {
    // 定義函式庫或應用程式的進入點
    input: entryFile,
    // 輸出打包模組
    output: [
      {
        // 輸出打包模組的檔案名稱
        file: `dist/${fileName}.umd.js`,
        // 輸出打包模組的檔案格式
        format: 'umd',
        // 輸出打包模組的全域變數名稱
        name: pluginName,
      },
    ],
    // 外掛套件
    plugins: [
      json(),
      alias({
        entries: [{ find: '@', replacement: pathResolve('src') }],
      }),
      nodeResolve({ mainFields: ['jsnext', 'preferBuiltins', 'browser'] }),
      commonjs({
        transformMixedEsModules: true,
        include: ['src/**'],
        extensions: ['.js'],
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: '**/node_modules/**',
        presets: ['@babel/preset-env'],
        extensions: ['.js'],
      }),
      // terser()
    ],
  },
];

