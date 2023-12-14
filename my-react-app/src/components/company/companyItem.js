import React, {useEffect, useState} from "react";
import {tableData} from "../../model/tableData";
import '../../App.css';
import axios from "axios";
import RenderEffect from "../../feature/renderEffect";

function CompanyItem(props) {

    //state
    const [companys, setCompanys] = useState([]);

    useEffect(() => {
        document.title = props.title;
    }, []);

    useEffect(() => {

        axios.get("https://web-chat.up.railway.app/company-api")

            .then(response => {

                setCompanys(response.data);
            })
            .catch(err => {

                console.log(err);
            });
    }, []);

    const text = RenderEffect("Công ty dự kiến");

    return (
        <div style={{maxWidth: "1000px", margin: "0 auto"}}>
            <h1 style={{paddingBottom:"50px", paddingTop:"50px" ,fontSize:"30px"}}>{text}</h1>
            <table>
                <thead>
                {
                    tableData.map((item, i)=>{

                        return(
                            <tr>
                                <th>{item.th_name || "Tên công ty"}</th>
                                <th>{item.th_linhvuc || "Lĩnh vực"}</th>
                                <th>{item.th_phone || "Số điện thoại"}</th>
                                <th>{item.th_email || "Email"}</th>
                                <th>{item.th_address || "Địa chỉ"}</th>
                                <th>{item.th_position || "Vị trí ứng tuyển"}</th>
                                <th>{item.th_salary || "Lương"}</th>
                            </tr>
                        );
                    })
                }
                </thead>
                <tbody>
                {companys.map((item, index) => (
                    <tr key={index}>
                        <td>{item.ten_cong_ty || null}</td>
                        <td>{item.linh_vuc || null}</td>
                        <td>{item.sdt || null}</td>
                        <td>{item.email || null}</td>
                        <td>{item.dia_chi || null}</td>
                        <td>{item.vi_tri_tuyendung || null}</td>
                        <td>{item.luong || null}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}


export default CompanyItem;