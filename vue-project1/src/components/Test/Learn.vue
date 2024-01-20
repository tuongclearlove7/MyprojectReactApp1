<template>
  <h3 v-bind:class="statusColor ? 'text-green' : 'text-red'">{{name}}</h3>
  <b v-text="name"></b>
  <h3 v-html="alert"></h3>
  <h3 v-bind:id="textId">Render ID</h3>
  <h3 class="text" v-bind:class="textClass">Render class</h3>
  <h3 v-bind:class="isUnderline && 'text-underline'">{{name}}</h3>
  <h3 v-bind:class="['text-red', 'text-green']">{{name}}</h3>
  <h3 v-bind:class="[isUnderline && 'text-underline', statusColor ? 'text-green' : 'text-red']">Use array</h3>
  <h3 v-bind:class="
    {
        promoted : isPromoted,
        new: !isPromoted,
        'text-green': isPromoted,
    }
    ">Use object</h3>
  <h3 v-bind:style="
    {
      color: 'orange',
      fontFamily: 'fantasy'
    }
    ">Inline style</h3>
  <h3 v-bind:style="[successObjectStyle]">Use array style</h3>
<!--  if else-->
  <h3 v-if="zeroNumber === 0">The number is 0</h3>
  <h2 v-else-if="zeroNumber < 0">The number is negative</h2>
  <h2 v-else-if="zeroNumber > 0">The number is positive</h2>
  <h3 v-else>Not a number</h3>

  <template v-if="display">
    <h3>Vue</h3>
    <h3>React</h3>
    <h3>Angular</h3>
  </template>
  <!--  showElement===false display none element  -->
  <h3 v-show="showElement">Using v-show</h3>
  <h3 v-for="(element, index) in lists" :key="element">
    {{index}} - {{element}}
  </h3>
  <!--  render list  -->
  <h3 v-for="family in families" :key="family.me">{{family.father}}</h3>
  <div v-for="actor in actors" :key="actor.name">
    <h3>
      {{actor.name}}
    </h3>
    <h3 v-for="hobby in actor.hobbies" :key="hobby">
      {{hobby}}
    </h3>
  </div>
  <!--  render object  -->
  <h3 v-for="value in myinfo" :key="value">{{value}}</h3>
  <template v-for="family in families" :key="family">
      <h3>{{family}}</h3>
  </template>
  <template v-for="list in lists" :key="list">
    <h3>{{list}}</h3>
    <input placeholder="number" />
  </template>
  <button @click="onSubmit">Submit</button>

<!--  if else list   -->
  <template v-for="number in lists" :key="number" >
    <h3 v-if="number === 1">{{number}}</h3>
  </template>
<!--  using method   -->
  <h3>{{add()}}</h3>
  <h3>{{receipt(5)}}</h3>

<!--  using event click   -->
  <h3>{{name}}</h3>
  <div>
    <button v-on:click="change($event), decrement(1, $event)">Change name</button>
  </div>

  <h3>{{count}}</h3>
  <div>
    <button @click="count++">Increment 1</button>
    <button @click="count+=2">Increment 2</button>
    <button v-on:click="decrement(1, $event)">Decrement 1</button>
    <button v-on:click="decrement(2, $event)">Decrement 2</button>
    <button v-bind:disabled="isDisabled">Bind</button>
  </div>

  <div>
    <h3></h3>
    <span>
      {{JSON.stringify(formValues, null, 2)}}
    </span>
  </div>

  <form @submit="submitForm">
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" placeholder="name..." v-model="formValues.name">
    </div>

    <div>
      <label for="profile">Profile summary</label>
      <br>
      <textarea id="profile" v-model="formValues.profileSummary"/>
    </div>

    <div>
      <label for="country">Country</label>
      <br>
      <select id="country" v-model="formValues.country">
          <option value="">Select a country</option>
          <option value="Việt Nam">Việt Nam</option>
          <option value="Nhật Bản">Nhật Bản</option>
          <option value="Hàn Quốc">Hàn Quốc</option>
      </select>
    </div>

    <div>
      <label for="job">Job</label>
      <br>
      <select id="job" multiple v-model="formValues.job">
        <option value="">Select a job</option>
        <option value="Java">Java</option>
        <option value="PHP">PHP</option>
        <option value="Javascript">Javascript</option>
      </select>
    </div>

    <div>
      <input type="checkbox"
             id="remoteWork"
             v-model="formValues.remoteWork"
             true-value="yes"
             false-value="no"
      />
      <label for="remoteWork">Open to remote work?</label>
    </div>

    <div>
      <label>Skill set</label>
      <input type="checkbox" id="html" value="html" v-model="formValues.skillSet"/>
      <label for="html">HTML</label>
      <input type="checkbox" id="css" value="css" v-model="formValues.skillSet"/>
      <label for="css">CSS</label>
      <input type="checkbox" id="javascript" value="javascript" v-model="formValues.skillSet"/>
      <label for="javascript">Javascript</label>
    </div>

    <div>
      <label>Skill set</label>
      <input type="radio" id="0-2" value="0-2" v-model="formValues.yearsOfExperience"/>
      <label for="0-2">0-2</label>
      <input type="radio" id="3-5" value="3-5" v-model="formValues.yearsOfExperience"/>
      <label for="3-5">3-5</label>
      <input type="radio" id="6-10" value="6-10" v-model="formValues.yearsOfExperience"/>
      <label for="6-10">6-10</label>
    </div>

    <div>
      <button>Submit</button>
    </div>
  </form>


</template>

<script>
export default {
  name: "Learn",
  data(){

    const myname = 'TuongClearlove7';

    return {

      count: 0,
      zeroNumber: 0,
      isShowText: false,
      isBtn: true,
      textbtn: 'Show',
      btnClass: 'btn btn-default',
      name: myname,
      alert: `<a href="/" onclick="alert('TuongClearlove7')">${myname}</a>`,
      textId: 'text-id',
      isDisabled: true,
      textClass: 'text-class',
      isUnderline: true,
      statusColor: false,
      isPromoted : true,
      successObjectStyle: {

        padding: '10px',
        color: 'black',
        background: 'lightgreen',
        border: '1px solid black',
      },
      display: true,
      showElement: false,
      lists : [1,2,3,4,5],
      families : [
        {father: 'Quang', mother: 'Cúc', syster_bro: 'Mai', me: 'Tường'},
        {father: 'Hồng', mother: 'Dung', syster_bro: 'Thắng', me: 'Thảo'},
      ],
      actors: [
        {
          name: 'Tường',
          hobbies: ['play soccer', 'play game', 'programming']
        },
        {
          name: 'Thảo',
          hobbies: ['listening music', 'learn language']
        },
      ],
      myinfo: {
        fullname: 'Trần Thế Tường',
        age: 22,
        birthday: '16-01-2002',
        nickname: 'Clearlove7',
      },
      formValues: {
        name: '',
        profileSummary: "",
        country: "",
        job: [],
        remoteWork: 'no',
        skillSet: [],
        yearsOfExperience: "",
      }
    };
  },
  methods: {

    onSubmit(){

      console.log(this.lists);

    },
    add(){

      return 1 + 2 + 3;
    },
    receipt: function(number) {

      return number * this.lists[1];
    },
    decrement(number, event){

      this.count-=number;

      console.log('Event: ', event);
    },
    change(event){

      this.name = "Trần Thế Tường";

      console.log('Event: ', event);
    },
    submitForm(event){

      event.preventDefault();

      console.log('Form values', this.formValues);
    },
  },
}
</script>

<style scoped>

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