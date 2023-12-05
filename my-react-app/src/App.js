import './App.css';
import {youtubeData} from "./model/youtubeData";
import {tableData} from "./model/tableData";
import CompanyItem from "./components/company/companyItem";
import YoutubeItem from "./components/youtube/youtubeItem";
import Toggle from "./components/state/toggle";
import View from "./components/view/view";
import React, { useState, useEffect } from 'react';

function App() {

    let desc = `React is a free and open-source front-end JavaScript library 
                for building user interfaces based on components. 
                It is maintained by Meta and a community of individual 
                developers and companies. React can be used to develop single-page, 
                mobile, or server-rendered applications with frameworks like Next.js.`;
    let image = `https://www.sevenstarwebsolutions.com/wp-content/uploads/2017/12/reactbanner.jpg`;
    const name = "Tuongclearlove7";

    return (
        <div className="container">
            <View image={image} title="Learning ReactJs" description={desc}>
                <Toggle>
                    <span>{name}</span>
                </Toggle>
            </View>
            <div className="distance-table-top"></div>
            <CompanyItem></CompanyItem>
        </div>
    );
}

export default App;
