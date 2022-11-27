<template>
  <!-- 会显示 pink 背景 -->
  <OneRootChild></OneRootChild>
  <br />
  <!-- 无背景颜色 -->
  <TwoRootChild></TwoRootChild>

  <div class="box1">
    <span>el-input:(原生样式: class: box1)</span>
    <el-input></el-input>
  </div>
  <div class="box2">
    <span>el-input:(修改样式1: class: box2)</span>
    <el-input></el-input>
  </div>
  <div class="box3">
    <span>el-input:(修改样式2: class: box3)</span>
    <el-input></el-input>
  </div>
</template>

<style scoped>
/* scoped 可以选择到子组件的根标签元素 */
.one-root-child {
  background-color: cyan;
}

/* 如果子组件没有根标签，则会失效 */
.two-root-child {
  background-color: burlywood;
}

.box1 {
  width: 300px;
  height: 40px;
  margin: 200px auto 0;
}

.box1 span {
  background-color: yellow;
}

.box1 .el-input {
  background-color: black;
}

.box2 {
  width: 300px;
  height: 40px;
  margin: 100px auto 0;
}

/* 无效，因为会转化成 .box2 .el-input .el-input__wrapper[data-v-7a7a37b1] {} */
.box2 :deep() .el-input .el-input__wrapper {
  background-color: red;
}

/* 有效，转化成 .box2[data-v-7a7a37b1] .el-input .el-input__wrapper {} */
.box2 :deep(.el-input) .el-input__wrapper {
  background-color: pink;
}

.box3 {
  width: 300px;
  height: 40px;
  margin: 100px auto 0;
}

/* 无效，因转化成 .box3 .el-input .el-input__wrapper[data-v-7a7a37b1] .el-input__inner {} */
.box3 .el-input .el-input__wrapper :deep(.el-input__inner) {
  background-color: blue;
}

/* 有效，转化成 .box3 .el-input .el-input__wrapper[data-v-7a7a37b1] .el-input__inner {} */
.box3 .el-input :deep(.el-input__wrapper) .el-input__inner {
  background-color: purple;
}
</style>
