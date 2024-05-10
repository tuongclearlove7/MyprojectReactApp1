import React, {useEffect, useState} from 'react';


function View() {

    //giá trị mặc định của biến name sẽ là Tuong
     const [name, setName] = useState("Tuong");
     const tabs = ['posts', "comments", "albums"];
     const [type, setType] = useState("posts");
     const [apis, setApi] = useState([]);

     //Hàm useEffect sẽ thực thi sau khối return
    // useEffect(()=>{
    //     //Mounted sẽ in ra mỗi khi component mounted và re render
    //     console.log("Mounted");
    // });

    // useEffect(() => {
    //     //Mounted sẽ in ra 1 lần mỗi khi component mounted và render
    //     console.log("Mounted!!!");
    // }, []);
    //trường hợp này Mounted vẫn sẽ in ra mỗi khi
    //component re render nó sẽ được gọi
    // trước khối lệnh return
    // Tuy nhiên nếu khối lệnh gọi trc này lỗi
    // điều đó sẽ làm lỗi ứng dụng
    //đây là 1 ví dụ:
    // console.log(a);
    // let a = 1;
    // console.log("Mounted");

    useEffect(() => {
        //api sẽ được gọi mỗi khi component mount
        // và mỗi lần biến type sẽ thay đổi
        // api sẽ được gọi trong trg hợp này
        // biến type đã đc truyền vào là dependency
        //api sẽ mặc định gọi posts vì biến type
        //có giá trị mặc định là posts
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

    useEffect(() => {
        //change name sẽ được in ra khi có hành động trên input name
        console.log("change name: ",name);
    }, [name]);

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
        <ul>
            {apis.map(api =>
                <li key={api.id}>{api.title || api.name}</li>
            )}
        </ul>
      </div>
  );
}




export default View;