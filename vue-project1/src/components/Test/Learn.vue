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
  <h3 v-once>{{name}}</h3>
  <div>
    <button v-on:click="change($event), decrement(1, $event)">Change name</button>
  </div>
  <h3 v-pre>{{name}}</h3>


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
      <input id="name" type="text" placeholder="name..." v-model.trim.lazy="formValues.name">
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
      <label for="age">Age</label>
      <input type="number" id="age" v-model.number="formValues.age" />
    </div>

    <div>
      <button>Submit</button>
    </div>
  </form>

  <h3>{{firstname}} {{lastname}}</h3>
  <h3>Computed fullname - {{fullName}}</h3>
  <button @click="changeName">Change name</button>
  <div v-for="item in items" :key="item.id">
    <span class="item">
      <b>Id: </b>{{item.id}}
    </span>
    <br>
    <span class="item">
      <b>Product name: </b>{{item.title}}
    </span>
    <br>
    <span class="item">
      <b>Price: </b>{{item.price}}
    </span>
    <br>
    <span class="item">
      <button class="btn-red" @click="removeItemById(item.id)">Delete</button>
    </span>
  </div>
  <br>
  <h4>
    Total: {{total}}
  </h4>

  <h3>Price item > 20000000</h3>
  <h3 v-for="item in expensiveItem" :key="item.id">
     <span class="item">
      <b>Id: </b>{{item.id}}
    </span>
    <br>
    <span class="item">
      <b>Product name: </b>{{item.title}}
    </span>
    <br>
    <span class="item">
      <b>Price: </b>{{item.price}}
    </span>
    <br>
  </h3>

  <h3>Volume Tracker (0-20)</h3>
  <h3>Current volume - {{volume}}</h3>
  <div>
    <button @click="volume += 2">Increment</button>
    <button @click="volume -= 2">Deccrement</button>
  </div>

  <input type="text" v-model="movie"/>
  <input type="text" v-model="movieInfo.title"/>
  <input type="text" v-model="movieInfo.actor"/>
  <div>
    <button @click="movieList = movieList.concat([movieInfo.title])">
      Add movie
    </button>
  </div>

  <div>
    <label for="title">Title</label>
    <input type="text" id="title" placeholder="Title..." v-model="newItem.title" />
    <label for="price">Price</label>
    <input type="text" id="price" placeholder="Price" v-model="newItem.price" />
  </div>

  <button @click="addItem">Add item</button>

</template>

<script>
export default {
  name: "Learn",
  data(){

    const myname = 'TuongClearlove7';

    return {

      count: 0,
      zeroNumber: 0,
      volume: 0,
      isShowText: false,
      isBtn: true,
      textbtn: 'Show',
      btnClass: 'btn btn-default',
      name: myname,
      firstname: 'Tuong',
      lastname: 'Tran',
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
        age: null,
      },
      newItem: {
        title: '',
        price: ''
      },
      items: [
        {
          id: 1,
          title: 'Laptop MSI Bravo 15',
          price: 20000000
        },
        {
          id: 2,
          title: 'Macbook m2',
          price: 30000000
        },
        {
          id: 3,
          title: 'Laptop DELL',
          price: 22000000
        },
      ],
      movie: 'Tuong',
      movieInfo: {
        title: '',
        actor: '',
      },
      movieList: ['Tuong', 'Clearlove7'],
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
    addItem(){

      const pRice = parseFloat(this.newItem.price ? this.newItem.price : 0);

      try{

        const maxId = this.items.reduce((max, item) => {

          return item.id > max ? item.id : max;

        }, this.items[0].id);

        const max = maxId ? maxId : 1;

        const item = {
          id: max + 1,
          title: this.newItem.title,
          price: pRice,
        };

        if(!item.price){
          alert(`Vui lòng nhập giá!`);
        }else{
          if(item.price !== 0){
            if(item.price <= 200000000){
              this.items.push(item);
            }
            else{
              alert(`Vui lòng nhập giá bé hơn ${200000000}!`);
            }
          }else{
            alert(`Vui lòng nhập giá khác ${0}!`);
          }
        }

        this.newItem.title = '';
        this.newItem.price = item.price;

        console.log(this.items);

      }catch (error) {

        const item = {
          id: 1,
          title: this.newItem.title,
          price: pRice,
        };

        if(!item.price){
          alert(`Vui lòng nhập giá!`);
        }else{
          if(item.price !== 0){
            if(item.price <= 200000000){
              this.items.push(item);
            }
            else{
              alert(`Vui lòng nhập giá bé hơn ${200000000}!`);
            }
          }else{
            alert(`Vui lòng nhập giá khác ${0}!`);
          }
        }

        this.newItem.title = '';
        this.newItem.price = item.price;

        console.log(this.items);

      }
    },

    removeItemById(id) {

      const indexToRemove = this.items.findIndex(item => item.id === id);

      if (indexToRemove !== -1) {

        this.items.splice(indexToRemove, 1);
      } else {

        console.warn(`Không tìm thấy mục với id ${id}`);
      }
    },
    changeName(){

        this.zeroNumber++;
        console.log(this.zeroNumber);

        if(this.zeroNumber % 2 === 0){

          this.fullName = 'Tuong Tran';
        }else{

          this.fullName = 'Tuong Clearlove7';
        }
    },
  },
  computed: {
    fullName : {

      get(){

        return `${this.firstname} ${this.lastname}`
      },
      set(value){

        const names = value.split(' ')
        this.firstname = names[0];
        this.lastname = names[1];
      },
    },
    total(){

      return this.items.reduce((total, curr) => (total = total + curr.price), 0);
    },
    storeData(){
      try{

        return localStorage.getItem('items');
      }catch (err){

        return err;
      }
    },
    expensiveItem(){

      return this.items.filter(item=>item.price>20000000);
    },
  },

  watch: {

    volume(newValue, oldValue){

      if(newValue > oldValue && newValue === 10){

        alert('Listening to a high volume for a long time may damage your hearing!');
      }
    },
    movie : {

      handler(newValue){

        console.log("Calling API with movie name:", newValue);
      },
      immediate: true,
    },
    movieInfo: {
      handler(newValue){

        console.log("Calling API with movie name:", newValue.title, newValue.actor);
      },
      deep: true,
    },
    movieList: {
      handler(newValue){

        console.log("Update list", newValue);
      },
    }
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

.item{

  margin-left: 10px;
}

</style>