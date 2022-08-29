import React from 'react';
import ReactDOM from 'react-dom';
import '../src/style.css'

// function Hi(){
//   return <div> <strong>Hello Mudassir 😙</strong> 
//  {/* <h1>Pakistan</h1>
//  <ul className='App-link'>
//    <li>raza</li>
//    <li>raza</li>
//    <li>raza</li>
//    <ol>
//    <li>raza</li>
//    <li>raza</li>
//    <li>raza</li>


//  </ol>


//  </ul>
  
//   <p> total amount :{20+5}</p> */}

  
//     </div>;

// }
// ReactDOM.render(<Hi/>,document.querySelector('#root'));

// window + .  (for emojii picker)


// function popup(){
//   alert("i am popup");

// }

// function Hi(props){
//   // return <div> <strong>Hello {props.name} {props.green.toString()} </strong>  </div>;
//   return <div> <strong>Hello {props.name} {JSON.stringify(props) } <button onClick={popup} >Click me</button> </strong>  </div>;

// }
// ReactDOM.render(
// <Hi name="Mudassir" green={true}
// data={{name:"Ali" , Age:"24"}}
// onClick={popup} 


// />
// ,document.querySelector('#root'));

// window + .  (for emojii picker)

// function Hi(props){
// function Hi({firstname,Middlename,Lastname}){
   
//   return <div>  Hello {firstname} {Middlename} {Lastname}  
//        </div>;

// }

// #anonymous functions
// const Hi =function ({firstname,Middlename,Lastname}){
   
//   return <div>  Hello {firstname} {Middlename} {Lastname}  
//        </div>;

// }

//arrow function 
// const Hi = ({firstname,Middlename,Lastname}) =>{
   
//   return <div>  Hello {firstname} {Middlename} {Lastname}  
//        </div>;

// }

// ES6 optional functional 
const Hi = ({firstname,Middlename,Lastname}) => 
<div>  Hello {firstname} {Middlename} {Lastname}  
       </div>;
    //   //  or 
    // (  <div>  Hello {firstname} {Middlename} {Lastname}  
    //    </div>; )



ReactDOM.render(
<Hi firstname="Muhammad" Middlename="Mudassir"  Lastname="Raza" 


/>
,document.querySelector('#root'));
