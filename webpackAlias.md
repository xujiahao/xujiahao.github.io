### 背景

React 项目中模块的引用路径过长，需要简化，同时又不丢失编辑提示、补全、索引跳转的功能。

### 方案

webpack 配置 + vscode 配置 + eslint 配置

**举例如下：定义别名 "@utils" 指向 "src/utils"**

- webpack 配置

  ```js
  // 根目录下的 webpack.xxx.js 文件
  const _ROOTPATH = process.cwd();
  module.exports = (env, argv) => {
      return {
  		resolve: {
              extensions: [".js", ".json", ".jsx", ".css", ".html"],
              alias: {
              	"@utils": path.resolve(_ROOTPATH, `./src`),
              }
          },
      };
  }
  ```

- jsconfig 配置

  ```json
  // 根目录下的 jsconfig.json
  {
      "compilerOptions": {
          "module": "commonjs",
          "target": "es2017",
          "allowSyntheticDefaultImports": false,
          "baseUrl": "./",
          "paths": {
              "@utils/*": [
                  "src/utils/*"
              ]
          },
          "jsx": "react"
      },
      "exclude": [
          "node_modules",
          "dist"
      ],
      "include": [
          "src"
      ],
  }
  ```

- eslint 配置

  ```js
  // 根目录下的 .eslintrc.js
  module.exports = {
      settings: {
          "import/resolver": {
              "alias": {
                  "map": [
                      ["@utils", "./src/utils"],
                  ]
              },
          }
      },
  };
  ```

- package.json

  ```json
  // 需安装辅助插件 eslint-import-resolver-alias
  {
      "devDependencies": {
          "eslint-import-resolver-alias": "1.1.2"
      }
  }
  ```

  
