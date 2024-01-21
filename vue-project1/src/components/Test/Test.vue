<template>
  <div  @click.self="onClose">
    <img v-bind:style="{

      width: '100%',

    }" v-bind:src="logo" alt="">
    <h3>{{title}}</h3>
    <h4 class="content" :class="{'text-red' : theme === 'contact'}">
      {{content}}
    </h4>
    <slot/>
    <div class="footer-test">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

import logo_img from '@/assets/rose.jpg';

export default {

  name: "Test",
    components: {

    },
    props:{
        title:{
            type: String,
            required: true,
        },
        content:{
          type: String,
          default: "",
        },
        theme:{
            type:String,
            default:'example',
            validator (value) {
              return ['example', 'sales', 'contact'].includes(value)
            },
        },
    },
    data(){

        return {

          logo: logo_img

        };
    },
    methods : {
        onClose(){

          this.$emit('cancel');

        }
    }
}
</script>

<style scoped>

.content.text-red{

  color: red;
}

</style>