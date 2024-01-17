<template>

  <div class="container">
    <Header ref="header"></Header>
    <teleport to="body">
      <Test content="this is a test content"
            title="This is a test new title"
            ref="hello"
            theme="contact"
            v-if="isShowText"
            @cancel="clickMe">
        <b>Children</b>
        <template v-slot:footer>
          <div>
            <button :class="{[btnClass] : true}"  @click="clickMe">
              Cancel
            </button>
          </div>
        </template>
      </Test>
    </teleport>
    <Button v-if="isBtn" :class="{[btnClass] : true}"  @click="clickMe">{{textbtn}}</Button>
  </div>
</template>

<script>

    import Test from "@/components/Test/Test.vue";
    import Header from "@/components/Header.vue";

    export default {

        components: {

            Header,
            Test,
        },
        data(){

            return {

              isShowText: false,
              isBtn: true,
              textbtn: 'Show',
              btnClass: 'btn btn-default',

            };
        },
        methods: {

            clickMe(){

                this.isShowText = !this.isShowText;

                if(this.isShowText){

                  this.textbtn = 'Hide';
                  this.btnClass = 'btn btn-red'

                }else{

                  this.textbtn = 'Show';
                  this.btnClass = 'btn btn-default'

                }
            }
        },
    }
</script>

<style lang="css">

  .btn-red{

    background: red;
  }

</style>

