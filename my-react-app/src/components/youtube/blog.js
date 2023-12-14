import React, {useEffect} from "react";
import YoutubeItem from "./youtubeItem";

function Blog(props){

    const bannerImg = "https://www.sevenstarwebsolutions.com/wp-content/uploads/2017/12/reactbanner.jpg";
    const author = "TuongClearlove7.";
    const title = ``;
    useEffect(() => {

        console.log(props.title);
        document.title = props.title;

    }, [props.title]);


    return(
        <div className={"blog-container"}>
            <YoutubeItem title1={`Học `}
                         title2={`ReactJS `}
                         title3={author}
                         colorLan={"#26C6DA"}
                         image={bannerImg}
                         author={author}
                         content={"React là một thư viện JavaScript front-end mã nguồn mở và miễn phí để xây dựng giao diện người dùng dựa trên các thành phần UI riêng lẻ. Nó được phát triển và duy trì bởi Meta và cộng đồng các nhà phát triển và công ty cá nhân."}
                         slug={`https://react.dev/`}
            />
            <YoutubeItem title1={`Học `}
                         title2={`NodeJS `}
                         title3={author}
                         colorLan={"black"}
                         image={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"}
                         author={author}
                         content={"Node.js là một hệ thống phần mềm được thiết kế để viết các ứng dụng internet có khả năng mở rộng, đặc biệt là máy chủ web. Chương trình được viết bằng JavaScript, sử dụng kỹ thuật điều khiển theo sự kiện, nhập/xuất không đồng bộ để tối thiểu tổng chi phí và tối đa khả năng mở rộng."}
                         slug={`https://nodejs.org/en`}
            />

        </div>
    );
}

export default Blog;
