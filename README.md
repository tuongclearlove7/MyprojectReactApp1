# KNOWLEDGE HOOKS IN REACT JS

### useState hook
```javascript

- Khi sử dụng useState react sẽ cho phép component render lại 
và thay đổi lại giá trị mà chúng ta muốn hiển thị ra giao diện.
Còn nếu thực hiện kiểu gán biến bình thường thì component sẽ 
không re render và giá trị mà chúng ta muốn hiển thị 
ra giao diện sẽ không thay đổi
ví dụ:

import React, { useState } from 'react';

function View() {
  //giá trị mặc định của biến name sẽ là Tuong
  const [name, setName] = useState("Tuong");

  return (
    <div>
      <p>My name: {name}</p>
      <button onClick={() =>{

         setName("Tran The Tuong");// sử dụng setName thì biến name sẽ cập nhật
         // lại thành Tran The Tuong và component sẽ re render lại và hiển thị 
         // ra Tran The Tuong
         //name = "Tran The Tuong" còn nếu làm thế này thì biến name vẫn sẽ
         //cập nhật thành Tran The Tuong tuy nhiên component sẽ không re render 
         // nên giá trị hiển thị ra vẫn là Tuong
      }}>
        Click me
      </button>
    </div>
  );
}


```

### useEffect hooks

```js
- Khi sử dụng useEffect chúng sẽ phải truyền vào hàm callback
- Hàm callback trong useEffect sẽ luôn được gọi khi
component mounted re render
- Khi dùng useEffect sẽ có 3 trường hợp mà chúng ta sử dụng đến đó 
là những trg hợp sau:
useEffect(()=>{});
+ sử dụng useEffect chỉ truyền vào hàm callback

useEffect(()=>{}, []);
+ sử dụng useEffect truyền vào 1 mảng rỗng

useEffect(()=>{}, [depen]);
+ sử dụng useEffect truyền vào 1 mảng chứa các dependency
(sự phụ thuộc)
+ Hàm callback sẽ được gọi lại mỗi khi dependency thay đổi

+ ví dụ: 

import React, { useState } from 'react';

function View() {
  const [name, setName] = useState("");
   const [type, setType] = useState("posts");

  // Mỗi lần gõ vào input component 
  // sẽ (mounted) re render lại và
  // hàm callback sẽ được gọi
  // Hàm useEffect sẽ thực thi sau khối lệnh return
  useEffect(()=>{
    // gõ vào input 10 lần Mounted sẽ in ra 10 lần
    console.log("Mounted");
  });

  useEffect(() => {
      //Mounted sẽ in ra 1 lần mỗi khi component mounted và render
      console.log("Mounted!!!");
  }, []);

   useEffect(() => {
        //api sẽ được gọi mỗi khi component mount
        // và mỗi lần biến type sẽ thay đổi
        // api sẽ được gọi trong trg hợp này
        // biến type đã đc truyền vào là dependency
        //api sẽ mặc định gọi posts vì biến type
        //có giá trị mặc định là posts
        //khi type thay đổi component sẽ re render ra
        //giá trị thay đổi theo biến type
        fetch("https://jsonplaceholder.typicode.com/" + type)
        .then(res=> res.json())
        .then(apis=>{
            setApi(apis);
        });
        //trường hợp này change name vẫn sẽ in ra mỗi khi
        //component mount tuy nhiên khi 1 biến khác không
        //phải dependency là biến name mà thay đổi thì
        //component sẽ re render nhưng change name không được
        //in ra còn nếu biến name thay đổi thì change name
        //sẽ được in ra ví dụ:
        // gõ vào input name 10 lần thì change name sẽ in ra 10 lần
        console.log("change name");

  }, [type]);

  //trường hợp này Mounted vẫn sẽ in ra mỗi khi
  //component re render nó sẽ được gọi
  // trước khối lệnh return
  // Tuy nhiên nếu khối lệnh gọi trc này lỗi
  // điều đó sẽ làm lỗi ứng dụng
  //đây là 1 ví dụ:
  console.log(a); 
  let a = 1;
  console.log("Mounted");

  return (
    <div>
        {tabs.map(tab=>
              <button style={type === tab ? {
                  background: "#333",
                  color: 'white'
                  } : {}} onClick={()=>{
                      setType(tab);
                  }} key={tab}>
                  {tab}
              </button>
        )}
        {/*Khối lệnh thực thi này sẽ thực thi trước useEffect*/}
        {console.log(name)}
       <input value={title} onChange={e => setName(e.target.value)}/>
    </div>
  );
}

```

### useEffect Life cyles (Vòng đời của hàm useEffect)
```js

- Life cycle của component trong reactjs là quá trình từ khi tạo ra, thay đổi và hủy bỏ component. Gồm 3 giai đoạn:

+ Tạo ra (Mounting)
- Ví dụ:
import React, { useState } from 'react';

const View = () => {
  

  return (
    <div>
        Hello world!
    </div>

  );
};

const App = () => {

  const [show, setShow] = useState(0);

  return (
    <div>
      <button onClick={()=> setShow(!show)}>Show</button>
      {show && <View/>}
    </div>

  );
};

export default Counter;

- Trong ví dụ này khi bấm Show component
View sẽ được mounted và render ra giao diện


+ Thay đổi (Updating)
- Ví dụ:
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
- Trong trường hợp này mỗi khi click Increment biến count sẽ
được update giá trị mới và component sẽ updating (re render)
lại và thay đổi giá trị biến count trên giao diện


+ Hủy bỏ (UnMounting)
- Ví dụ: 

import React, { useState } from 'react';

import React, { useState, useEffect } from 'react';

const SlowComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Một tác vụ chậm, ví dụ: gửi request mạng
        const response = await fetch('https://api.example.com/slow-request');
        const data = await response.json();
        console.log(data);
        setCount(count + 1);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    // Cleanup khi component unmount
    return () => {
      // Hủy bỏ các tài nguyên không cần thiết ở đây, ví dụ: event listeners, subscriptions
      console.log('Cleanup executed');
    };
  }, []); // Tham số thứ hai là mảng rỗng, chỉ chạy một lần sau khi component mount

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};

const App = () => {

  const [show, setShow] = useState(0);

  return (
    <div>
      <button onClick={()=> setShow(!show)}>Show</button>
      {show && <SlowComponent/>}
    </div>

  );
};

- Trong ví dụ này khi bấm "Show" thì SlowComponent
sẽ được mount và render ra giao diện sau đó 
bấm tiếp "Make Slow Request" thì hàm fetchData sẽ chạy
và 1 request sẽ gửi đi trong thời gian request gửi đi
nếu bấm tiếp "Show" thì SlowComponent sẽ bị (unmount) ẩn đi 
lúc này nếu k có cleanup trong hàm useEffect thì
hàm fetchData vẫn hoạt động điều này sẽ làm tiêu
tốn tài nguyên của ứng dụng

```



# PROJECT WEB API


## Web api nodeJS project:

- Link demo client server: https://webchat-react-app1.vercel.app/
- Link backend server: https://web-chat.up.railway.app/
- Link source code backend: https://github.com/alison16smotthie/Web-chat
- Link source code frontend: https://github.com/tuongclearlove7/MyprojectReactApp1/tree/main/my-react-app


## DEVELOPER

```js


|------------------------------------------------|
|                 TUONGCLEARLOVE7                |
|------------------------------------------------|


```

## FREATURES

```js

+ Login & logout.
+ Jwt authentication & authorization.
+ Chat in real-time.
+ Chatbot on Facebook.
+ Read data from API, and send mail.


```


### RUNNING PROJECT

```js


=> cd my-react-app 
=> npm install dependencies

  "@emailjs/browser": "^3.11.0",
  "@fortawesome/fontawesome-svg-core": "^6.5.1",
  "@fortawesome/react-fontawesome": "^0.2.0",
  "@reduxjs/toolkit": "^2.0.1",
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.6.2",
  "bootstrap": "5.3",
  "buffer": "^6.0.3",
  "emailjs": "^4.0.3",
  "font-awesome": "^4.7.0",
  "js-cookie": "^3.0.5",
  "jsonwebtoken": "^9.0.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^9.0.4",
  "react-router-dom": "^6.21.0",
  "react-scripts": "5.0.1",
  "react-scroll-to-bottom": "^4.2.0",
  "react-scroll-to-top": "^3.0.0",
  "react-toastify": "^9.1.3",
  "socket.io-client": "^4.7.2",
  "styled-components": "^6.1.1",
  "sweetalert2": "^11.10.1",
  "web-vitals": "^2.1.4"

based on the package.json file. 
=> npm start 

DONE


```


















