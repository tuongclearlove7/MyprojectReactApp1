<template>
  <div class="container">
    <div class="header" v-if="isShowHeader">
      <Header ref="header"></Header>
    </div>
    <Button v-if="isBtn" :class="{[btnClass] : true}"  @click="clickMe">{{textbtn}}</Button>
    <Greet title="Hello world!" nickName="Clearlove7"/>
    <Greet :nick-name="channel"/>
    <Article id="my-article" title="Article title" :number="7" :isPublished="true" />
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

    import Header from "@/components/Header.vue";
    import Test from "@/components/Test/Test.vue";
    import Learn from "@/components/Test/Learn.vue";
    import Greet from "@/components/Test/Geeet.vue";
    import Article from "@/components/Test/Article.vue";


    const myname = 'TuongClearlove7';

    export default {

        components: {

            Article,
            Header,
            Learn,
            Greet,
            Test,
        },
        data(){

            return {
                zeroNumber: 0,
                isShowText: false,
                isBtn: true,
                textbtn: 'Show app',
                btnClass: 'btn btn-default',
                isShowHeader: true,
                channel: 'Learn vue js'
            };
        },
        methods: {

            clickMe(){

                this.isShowText = !this.isShowText;

                if(this.isShowText){

                  this.isShowHeader = !this.isShowHeader;
                  this.textbtn = 'Hide app';
                  this.btnClass = 'btn btn-red'

                }else{

                  this.textbtn = 'Show app';
                  this.btnClass = 'btn btn-default';
                  this.isShowHeader = !this.isShowHeader;

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

