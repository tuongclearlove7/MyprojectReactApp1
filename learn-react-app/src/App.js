import logo from './logo.svg';
import './App.css';
import View from "./components/View";
import {useState} from "react";

function App() {

    const [turn, setTurn] = useState(false);



  return (
    <div className="App">
        <button onClick={e=>
            setTurn(true)}>
            Turn on
        </button>
        {turn && <View/>}
    </div>
  );
}

export default App;
