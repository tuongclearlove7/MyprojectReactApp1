<template>
  <div @click.self="onClose">
    <h2>Hello world</h2>
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