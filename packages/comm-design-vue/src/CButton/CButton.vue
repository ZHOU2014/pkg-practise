<template>
  <div class="button">
    <div class="parent-button">父级按钮1{{ name }}</div>
    <div class="child-button">子级按钮1{{ name }}</div>
    <div class="background"></div>
    <img src="./22.jpg" alt="22" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'CButton',
  data() {
    return {
      name: '李四2',
    };
  },
  created() {
    const name = '张三';
    interface Person {
      name: string;
      age: number;
    }
    const person: Person = {
      name: '李四',
      age: 2,
    };
    console.log(name);
    console.log(person);
  },
  methods: {
    getData() {
      axios.get('/api/getData').then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.button {
  background: #0f0;

  .parent-button {
    color: #00f;
    font-size: 25px;
  }

  .background {
    width: 300px;
    height: 300px;
    background: url('./3.jpg') no-repeat;
    background-size: 100% 100%;
  }
}
</style>

<style scoped>
.child-button {
  color: #f00;
  font-size: 17px;
}
</style>
