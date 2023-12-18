import React, {useEffect, useState} from "react";
import {tableData} from "../../model/tableData";
import '../../App.css';
import axios from "axios";
import RenderEffect from "../../feature/renderEffect";

function CompanyItem(props) {

    //state
    const [companys, setCompanys] = useState([]);
    const hostname = `${process.env.REACT_APP_API_HOSTNAME}company-api`;

    useEffect(() => {

        document.title = props.title;
    }, []);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(hostname, {
                    headers: {
                        Authorization: `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
                    },
                });

                setCompanys(response.data);

            } catch (error) {

                console.error("Error fetching data:", error);
            }
        };

        fetchData().then();

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
                        <td>{item.ten_cong_ty || "Không tìm thấy dữ liệu"}</td>
                        <td>{item.linh_vuc || "Không tìm thấy dữ liệu"}</td>
                        <td>{item.sdt || "Không tìm thấy dữ liệu"}</td>
                        <td>{item.email || "Không tìm thấy dữ liệu"}</td>
                        <td>{item.dia_chi || "Không tìm thấy dữ liệu"}</td>
                        <td>{item.vi_tri_tuyendung || "Không tìm thấy dữ liệu"}</td>
                        <td>{item.luong || "Không tìm thấy dữ liệu"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}


export default CompanyItem;