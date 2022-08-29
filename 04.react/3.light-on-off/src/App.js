// used state 
import React ,{ useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './index.css';

function Room() {
  
  // let roll =5   //in js
 // first variable roll is used to read only and the second one setroll is used to make change in first variable
//  const [roll ,setroll] =useState(5)
  
  //  useState ma jo hum value rakhta ha wo iski initial value hoti ha
  // function increment() {
  //   setroll(roll + 1) ;
  //   console.log("roll :" + roll);}

    const [isLit, setLit] =  useState(true); 
    const toogle = () => {
      // setLit(!isLit);
    // Another way
    setLit(function (prevIsLit) {
      return !prevIsLit
    });

      console.log("I am running: ")
    
    }
    const brightness = isLit ? "lit" : "dark";
  return (
    // <div className="room"> {roll} <button onClick={increment}>Change</button> </div>
    // (isLit === true) you can also write in this way
    <div className={`room ${brightness}`}> {(isLit) ?"room isLit ": "room is dark" }
    <br />
     <button onClick={toogle}>flip</button>
      
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
