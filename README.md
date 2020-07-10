# vue-npm-template

## vue + ts 打包成 npm 的模版

基于 vue2.6.11 和 typescript

### 1.修改 package.json

将 package.json 中所有的`vue-npm-template`修改成你自己的项目名称，
可以使用 npm search yourprojectname 查看是否有同名库，或者[https://www.npmjs.com/](https://www.npmjs.com/)这个网站搜索

### 2.开发组件

在 packages 文件夹中创建需要开发的组件，开发完成后将组件在`packages/index.ts`中引入

### 3.查看 demo（自信的可以不需要这个,但是不建议）

在 examples 中的`app.vue`中引入新的组件,运行查看

### 4.打包

运行`npm run lib`

### 5.发布

#### 别忘了更新版本号！

运行`npm run publish`
