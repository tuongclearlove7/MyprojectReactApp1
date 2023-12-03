import React, {useEffect, useState} from "react";
import {tableData} from "../../model/tableData";
import '../../App.css';
import axios from "axios";

function CompanyItem() {

    const [companys, setCompanys] = useState([]);

    useEffect(() => {
        axios.get("https://web-chat.up.railway.app/company-api")
            .then(response => {
                setCompanys(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    console.log(companys);

    return (
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
    );
}


export default CompanyItem;