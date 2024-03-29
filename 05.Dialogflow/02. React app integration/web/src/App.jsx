
import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Stack, Container, Row, Col } from 'react-bootstrap';



function ChatWindow() {

  const [userText, setUserText] = useState("");
  const [messages, setMessages] = useState([]);

  // setUserText("sdkjfhdkfjs");
  // setUserText((prev)=>{
  //   return prev + " some new value";
  // })

  const sendMessage = async (text) => {

    setMessages((prev) => (
      [{ sender: "user", text: text }, ...prev]
    ));

    // TODO: send message on dialogflow and get reply
    const response = await axios.post("http://localhost:5000/talktochatbot", {
      query: text,
    })
    console.log("response.data: ", response.data);

    let audioBufer = response.data.pop().audio;
    console.log("audioBufer: ", audioBufer);

    // let dataUrl = btoa(String.fromCharCode(...new Uint8Array(audioBufer?.data)));
    let dataUrl  = btoa(new Uint8Array(audioBufer.data) .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    console.log("dataUrl: ", dataUrl);

    let audioFile = new Audio(dataUrl);
    audioFile.play();

    document.querySelector("#myaudio").src = "data:audio/mp3;base64," + dataUrl;
    document.querySelector("#myaudio").play()

    setMessages((prev) => (
      [...response.data, ...prev]
    ));

    setUserText("");
  }

  const sendButtonClick = (e) => {
    e.preventDefault();
    if (userText.trim() === "") return;
    sendMessage(userText)
    e.target.reset();
  }

  const suggestionClick = (e) => {
    console.log("suggestionClick: ", e.target.innerText);
    sendMessage(e.target.innerText)
  }

  return <>
    <audio id="myaudio"></audio>

    <h1 className='heading'>CHAT APP</h1>

    <form onSubmit={sendButtonClick} className="form">

      <Stack direction="horizontal" gap={3}>

        <Form.Control className="me-auto inputField" type="text"
          placeholder="Enter your text here"
          onChange={(e) => { setUserText(e.target.value) }} />

        <Button type="submit" variant="secondary" className='submitButton'>Submit</Button>
      </Stack>

    </form>

    <div>


      <Container>
        {messages.map((eachMessage, index) => (
          (eachMessage.sender === "user") ?
            (<Row key={index}>
              <Col xs={3}></Col>
              <Col className='message user-message'>{eachMessage.text}</Col>
            </Row>)
            :
            ([

              eachMessage?.text !== undefined ? (<Row key={index}>
                <Col className='message chatbot-message'>{eachMessage.text}</Col>
                <Col xs={3}></Col>
              </Row>) : null

              ,

              eachMessage?.quickReplies !== undefined ? (<Row key={index}>
                <Col className='message chatbot-message'>
                  {
                    eachMessage.quickReplies.map(eachReply => (
                      <button onClick={suggestionClick} className='quickReply'>{eachReply}</button>
                    ))
                  }
                </Col>
                <Col xs={3}></Col>
              </Row>) : null
              ,

              // eachMessage?.cards !== undefined ? (<Row key={index}>
              //   <Col className='message chatbot-message'>{eachMessage.text}</Col>
              //   <Col xs={3}></Col>
              // </Row>) : null

            ])

        ))}
      </Container>





    </div>



  </>
}




function App() {
  return <ChatWindow />;
}
export default App;
























// import './App.css';

// import { useState } from "react";
// import axios from "axios";
// import { Button, Form, Stack, Container, Row, Col } from 'react-bootstrap';



// function ChatWindow() {

//   const [userText, setUserText] = useState("");
//   const [messages, setMessages] = useState([]);

//   // setUserText("sdkjfhdkfjs");
//   // setUserText((prev)=>{
//   //   return prev + " some new value";
//   // })
   
//   const sendMessage = async (text) => {
//     // e.preventDefault();

//     if (userText.trim() === "") return;
 
//     console.log("sending message");

//     setMessages((prev) => (
//       [{ sender: "user", text: text }, ...prev]
//     ));

//     // TODO: send message on dialogflow and get reply
//     let response = await axios.post("http://localhost:5000/talktochatbot", {
//       query: text,


//     })
//     // const data = response.data;
//     console.log(response.data);

//     // let audioBufer = response.data.pop().audio;
//     // console.log("audioBufer: ", audioBufer);

//     // let dataUrl = btoa(String.fromCharCode(...new Uint8Array(audioBufer.data)));
//     // console.log("dataUrl: ", dataUrl); 

//     // // let dataUrl= new File(audioBufer).toString("base64");

//     // let audioFile = new Audio(dataUrl);
//     // audioFile.play();


//     // document.querySelector("#myaudio").src = "data:audio/mp3;base64," + dataUrl;
//     // document.querySelector("#myaudio").play()




//     setMessages((prev) => (
//       [...response.data, ...prev]
//     ));

//     setUserText("");
//     // e.target.reset();

//     // setTimeout(() => {
//     //   setMessages((prev) => (
//     //     [{ sender: "chatbot", text: "hello from chatbot" }, ...prev]
//     //   ));
//     // }, 1000);

//   }

//   const sendButtonClick = (e) => {
//     e.preventDefault();
//     if (userText.trim() === "") return;
//     sendMessage(userText)
//     e.target.reset();
//   }


//   const suggestionClick = (e) => {
//     console.log("suggestionClick: ", e.target.innerText);
//     sendMessage(e.target.innerText)
//   }


//   return <>

//     <audio id="myaudio"></audio>
//     <h1 className='heading'>CHAT APP</h1>

//     <form onSubmit={sendMessage} className="form">

//       <Stack direction="horizontal" gap={3}>
//         <Form.Control className="me-auto inputField" type="text" placeholder="Enter your text here" onChange={(e) => { setUserText(e.target.value) }} />
//         <Button type='submit' variant="secondary" className='submitButton'>Submit</Button>
//       </Stack>

//     </form>

//     <div>


//       <Container>
//         {messages.map((eachMessage, index) => (
//           (eachMessage.sender === "user") ?
//             (<Row key={index}>
//               <Col xs={3}></Col>
//               <Col className='message user-message'>{eachMessage.text}</Col>
//             </Row>)
//             :
//             ([

//               eachMessage?.text !== undefined ? (<Row key={index}>
//                 <Col className='message chatbot-message'>{eachMessage.text}</Col>
//                 <Col xs={3}></Col>
//               </Row>) : null

//               ,

//               eachMessage?.quickReplies !== undefined ? (<Row key={index}>
//                 <Col className='message chatbot-message'>
//                   {
//                     eachMessage.quickReplies.map(eachReply => (
//                       <button onClick={suggestionClick} className='quickReply'>{eachReply}</button>
//                     ))
//                   }
//                 </Col>
//                 <Col xs={3}></Col>
//               </Row>) : null
//               ,

//               // eachMessage?.cards !== undefined ? (<Row key={index}>
//               //   <Col className='message chatbot-message'>{eachMessage.text}</Col>
//               //   <Col xs={3}></Col>
//               // </Row>) : null

//             ])

          
//         ))}
//       </Container>





//     </div>



//   </>
// }




// function App() {
//   return <ChatWindow />;
// }
// export default App;