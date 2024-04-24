import React, {useEffect, useState} from 'react';

function View() {

    //giá trị mặc định của biến name sẽ là Tuong
     const [name, setName] = useState("Tuong");

     //Hàm useEffect sẽ thực thi sau khối return
    // useEffect(()=>{
    //     //Mounted sẽ in ra mỗi khi component mounted và re render
    //     console.log("Mounted");
    // });

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
    // console.log(a);
    // let a = 1;
    // console.log("Mounted");

  return (
      <div>
          {/*Khối lệnh thực thi này sẽ thực thi trước useEffect*/}
          {/*{console.log(name)}*/}
        <p>My name: {name}</p>
          <input type="text" onChange={(e) => {

              //re render
              setName(e.target.value);
          }}
          />
        <button onClick={() =>{
            // sử dụng setName thì biến name sẽ cập nhật
            // lại thành Tran The Tuong và component sẽ re render lại và hiển thị
            // ra Tran The Tuong
            //name = "Tran The Tuong" còn nếu làm thế này thì biến name vẫn sẽ
            //cập nhật thành Tran The Tuong tuy nhiên component sẽ không re render
            // nên giá trị hiển thị ra vẫn là Tuong
            //re render
            setName("Tran The Tuong");
        }}>
          Click me
        </button>
      </div>
  );
}




export default View;