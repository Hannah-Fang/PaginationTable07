export default {
  input: 'src/index.js',
  output: [
        {
            // 輸出 UMD
            name: 'TableCRUD',
            file: 'dist/main.umd.js',
            format: 'umd',
        },
        {
            // 輸出 ESM (ES6 原生支援模組規範)
            name: 'TableCRUD',
            file: 'dist/main.esm.js',
            format: 'esm',
        },
    ],
};