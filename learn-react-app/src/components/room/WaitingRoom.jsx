import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const WaitingRoom = () => {

    const [message, setMessage] = useState("BẤM NÚT BẮT ĐẦU ĐỂ THAM GIA SẢNH CHỜ");
    const [textStartBtn, setTextStartBtn] = useState("BẮT ĐẦU CHỜ");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const getUserId = () => {
        return "userId";
    }

    useEffect(  () => {

        // Lấy thời gian bắt đầu từ localStorage
        const startTime = localStorage.getItem(getUserId());
        const waitTime = 32; // Thời gian chờ

        // Kiểm tra nếu có startTime
        if (startTime) {
            const timerInterval = setInterval(async () => {
                // Thời gian trôi qua tính bằng giây
                const elapsedTime = (Date.now() - startTime) / 1000;
                // Thời gian còn lại để chờ
                const remainingTime = waitTime - elapsedTime;

                console.log("thời gian trôi qua ", elapsedTime);
                console.log("thời gian còn lại ", remainingTime);

                setShow(true);
                setTextStartBtn("TẢI LẠI TRANG");
                // nếu thời gian còn lại <= 0 thì sẽ xóa user trong localStorage đi
                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    localStorage.removeItem(getUserId()); // Xóa thời gian bắt đầu khỏi localStorage
                    setMessage("Thời gian chờ đợi của bạn đã hết!");
                    setShow(false);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    window.location.reload();
                } else {
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);
                    const seconds = Math.floor(remainingTime % 60);

                    setMessage(`Còn ${hours} giờ, ${minutes} phút ${seconds} giây là hết giờ`);
                }
            }, 1000); // Cập nhật thời gian mỗi giây

            // Xóa bộ đếm khi unmount
            return () => clearInterval(timerInterval);
        }
    }, [getUserId()]); // useEffect sẽ chạy lại khi userId thay đổi

    const handleStartTime = () => {

        const userId = localStorage.getItem(getUserId());

        //nếu không có userId thì sẽ reload lại trang
        if (!userId) {
            // Lưu thời gian bắt đầu vào localStorage
            localStorage.setItem(getUserId(), Date.now());
        }
        navigate("/waiting-room");
        window.location.reload();
    };

    const handleCancelTime = () => {
        // Xóa thời gian bắt đầu từ localStorage
        localStorage.removeItem(getUserId());
        navigate("/");
        window.location.reload();
    };

    return (
        <div>
            <h1>{show ? "BẠN ĐANG TRONG PHÒNG CHỜ" : "THAM GIA PHÒNG CHỜ NGAY"}</h1>
            <h2>Waiting room feature</h2>
            <h1 style={{color:"red"}} id="message">{message}</h1>
            <div style={{paddingTop:"20px"}}>
                <button onClick={handleStartTime}>{textStartBtn}</button>
            </div>
            <div style={{paddingTop:"20px"}} className="cancel">
                {show && <button onClick={handleCancelTime}>HỦY PHIÊN CHỜ</button>}
            </div>
        </div>
    );
};

export default WaitingRoom;