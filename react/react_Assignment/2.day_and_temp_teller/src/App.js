import React ,{ useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './index.css';

function Room() {
  
  
// light on/ off
    const [Light, setLight] =  useState(true); 
    
    const toogle = () => {
      setLight(!Light);
      
    }
    const brightness = Light ? "lit" : "dark";
 
    // temp inc/dec
    const [temp, settemp] =  useState(72); 
    function increment() {
      settemp(temp + 1)
    }
    function decrement() {
      settemp(temp - 1)
    }
  return (
    // <div className="room"> {roll} <button onClick={increment}>Change</button> </div>
    // (isLit === true) you can also write in this way
    <div className={`room ${brightness}`}style={{fontSize:40,padding:20}}>  
    <br/> 
   <h1>{(Light) ?" It is a day ": " It is a night" }</h1> 

   
    <h3> {temp}</h3>

    <br />
     
     <button onClick={toogle}>ON/OFF</button>
     <button onClick={increment}>temp_increase</button>
     <button onClick={decrement}>temp_decrease</button>

      
    </div>
  );
}


function App() {
  return (
    <div className="App">
       <Room/>
    </div>
  );
}

export default App;
