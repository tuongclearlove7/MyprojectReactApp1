import React, {useEffect, useState} from "react";
import YoutubeItem from "./youtubeItem";
import axios from "axios";

function Blog(props){

    const [blogs, setBlogs] = useState([]);
    const bannerImg = "https://www.sevenstarwebsolutions.com/wp-content/uploads/2017/12/reactbanner.jpg";
    const author = "TuongClearlove7.";
    const title = ``;
    const hostname = `${process.env.REACT_APP_API_HOSTNAME}blog-api?access_key=${process.env.REACT_APP_ACCESS_KEY}`;

    useEffect(() => {

        document.title = props.title;

    }, [props.title]);

    useEffect(() => {

        axios.get(hostname)

            .then(response => {

                setBlogs(response.data);
            })
            .catch(err => {

                console.log(err);
            });
    }, []);


    return(
        <div className={"blog-container"}>
            {
                blogs.map((item, index) => {
                    return(
                        <div key={index}>
                            <YoutubeItem title={item.title || "Không tìm thấy dữ liệu"}
                             colorLan={"#26C6DA" || "Không tìm thấy dữ liệu"}
                             image={item.image || "Không tìm thấy dữ liệu"}
                             author={item.author || "Không tìm thấy dữ liệu"}
                             content={item.content || "Không tìm thấy dữ liệu"}
                             slug={`https://react.dev/` || "Không tìm thấy dữ liệu"}
                             index={(index+1) || "Không tìm thấy dữ liệu"}
                             createdAT={item.createdAt || "Không tìm thấy dữ liệu"}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Blog;
