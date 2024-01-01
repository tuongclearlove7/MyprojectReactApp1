import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import "./weatherStyle.css"
import YoutubeItem from "../blog/youtubeItem";
import logo from "../../logo.svg";
import {UserContext} from "../../feature/userContext";

function Weather(props) {

    const [loading, setLoading] = useState(false);
    const [weathers, setWeathers] = useState([]);
    const hostname = `${process.env.REACT_APP_API_HOSTNAME}weather-api`;
    const {OnLocalStorage} = useContext(UserContext);

    useEffect(() => {

        document.title = props.title;

    }, []);

    useEffect(() => {

        const FetchData = async () => {

            try {

                const response = await axios.get(hostname);

                setWeathers(response.data);

            } catch (error) {

                console.error("Error fetching data: ", error);
            }
        }

        FetchData().then();
        onLoading().then(r => r);

    }, []);


    const onLoading = async () => {

        const wait = async () => {

            const timer = 2000;
            const interval = 1000;

            for (let i = 0; i < timer / interval; i++) {

                await new Promise(resolve => setTimeout(resolve, interval));
                console.log(`wait ${(i + 1) * interval / 1000}s`);
            }
        }

        setLoading(true);
        const data = await OnLocalStorage("get", "onLoading", "", "data");
        console.log("LocalStorage data: ", data);
        await OnLocalStorage("remove", "onLoading", "", "data", wait);
        setLoading(false);

    };

    return (
        <div className={"weather-container"}>
            <div className="container py-2 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-10 col-lg-8 col-xl-6">
                        <div className="card text-white" style={{borderRadius: "40px"}}>
                            <div className="bg-image" style={{borderRadius: "50px"}}>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                                    className="card-img" alt="weather"/>
                                <div className="mask"></div>
                            </div>
                            <div className="card-img-overlay text-dark p-5">
                                {loading ? (
                                    <div className={"load-logo-center"}>
                                        <img src={logo} className="loading-logo-account" alt="logo"/>
                                    </div>
                                    ) : (
                                    <div>
                                        <h4 className="mb-0">
                                            {weathers && weathers.sys && weathers.sys.country && `Juneau, ${weathers.name === "Turan" && "Da Nang"}, ${weathers.sys.country}`}
                                        </h4>
                                        <p className="display-2 my-3">
                                            {weathers && weathers.main && `${(weathers.main.temp - 273.15).toFixed(2)} °C`}
                                        </p>
                                        <p className="mb-2">Feels Like:
                                            <strong>
                                                {weathers && weathers.main && `${(weathers.main.temp - 273.15).toFixed(2)} °C`}
                                            </strong>
                                        </p>
                                        <h5>
                                            {weathers && weathers.weather && weathers.weather[0].description}
                                        </h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;