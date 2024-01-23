<template>
<!--  div element non attribute-->
  <div>
    <h2>Article component</h2>
    <h2 v-bind="$attrs">{{title}}</h2>
    <h2>{{number}}</h2>
    <h2>Published - {{isPublished ? 'Yes' : 'No'}}</h2>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    // validate attribute
    title: {
      type: String,
      required: true,
      default: 'Article default title'
    },
    number: Number,
    isPublished: Boolean,
  },
  inheritAttrs: false,
}
</script>

<style scoped>

</style>