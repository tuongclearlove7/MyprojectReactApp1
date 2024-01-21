<template>
  <h1>
    <span>
        Hello world! <img v-bind:style="{width: '20%',}" v-bind:src="logo" alt="">
    </span>
  </h1>
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
  name: "Header",

  data(){

    return {

      logo: logo

    };
  },
}
</script>

<style scoped>

h1{
  color: #0ea43f;
  --x: 50%;
  --y: 50%;
  text-align: center;
  padding: 20px;
  border: 2px solid #1a1a1a;
  background: linear-gradient(#fafafa, #af7ff7) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box;
}

</style>