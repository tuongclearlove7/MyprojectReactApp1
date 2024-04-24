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
  const [name, setName] = useState("Tuong");//giá trị mặc định của biến name sẽ là Tuong

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
- Khi dùng useEffect sẽ có 3 trường hợp mà chúng ta sử dụng đến đó 
là những trg hợp sau:
+ sử dụng useEffect chỉ truyền vào hàm callbacks
+ Hàm callback trong useEffect sẽ luôn được gọi khi
component re render
useEffect(()=>{});

+ ví dụ: 

import React, { useState } from 'react';

function View() {
  const [name, setName] = useState("");

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
        {/*Khối lệnh thực thi này sẽ thực thi trước useEffect*/}
        {console.log(name)}
       <input value={title} onChange={e => setName(e.target.value)}/>
    </div>
  );
}

+ sử dụng useEffect truyền vào 1 mảng rỗng
useEffect(()=>{}, []);

+ sử dụng useEffect truyền vào 1 mảng chứa các dependency
(sự phụ thuộc)
useEffect(()=>{}, [depen]);

- Hàm callback trong useEffect sẽ luôn được gọi khi
component mounted (render)


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


















