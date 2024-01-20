<template>
  <div class="container">
    <Header ref="header"></Header>
    <Button v-if="isBtn" :class="{[btnClass] : true}"  @click="clickMe">{{textbtn}}</Button>
    <teleport to="div">
      <Test title="This is a rose title"
            content="this is a test content"
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
    <Learn/>
  </div>
</template>

<script>

    import Test from "@/components/Test/Test.vue";
    import Learn from "@/components/Test/Learn.vue";
    import Header from "@/components/Header.vue";

    const myname = 'TuongClearlove7';

    export default {

        components: {

            Header,
            Learn,
            Test,
        },
        data(){

            return {
                zeroNumber: 0,
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

  .text-red{

    color: red;
  }

  .text-green{

    color: #00d000;
  }

  .text-underline{

    text-decoration: underline;
  }

</style>

