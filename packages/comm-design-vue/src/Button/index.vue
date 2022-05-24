<template>
  <div>Button{{ name }}</div>
</template>

<script lang="ts">
export default {
  name: 'c-Button',
  data() {
    return {
      name: '张三',
    };
  },
  created() {
    const name = '张三';
    console.log(name);
  },
};
</script>
