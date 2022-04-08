import express from "express";
import Alexa, { SkillBuilders } from 'ask-sdk-core';
// import cors from "cors";
import morgan from "morgan";
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import axios from "axios";
import moment from "moment";

// let result =   moment.duration("P6D");
// console.log("moment.js result", result.asDays())
    


import mongoose from "mongoose";


mongoose.connect("mongodb+srv://mudassir:mudassir786110@cluster0.6sgt9.mongodb.net/alexaclassdb?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
  })
  mongoose.connection.on("error", () => {
    console.log("mongodb error");
  })

  // schema model
  const Countingschema = new mongoose.Schema(

     { 
       // schema types
      intentName: String,
      date: {type:Date,default :Date.now}, 
    
   });
  const CountingModel = mongoose.model('Counting', Countingschema);

// for booking room
const bookingSchema = new mongoose.Schema({
  numberOfPerson: String,
  roomType: String,
  arrivalDate: String,
  duration: String,
  
  createdOn: { type: Date, default: Date.now },
});
const bookingModel = mongoose.model('Booking', bookingSchema);


function pluck(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}









const app = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 8000;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
      const speakOutput = 'Hello Assalam Alikum and Hello and Welcome, i am assitant of Mr.mudassir . Which would you like to ask? i can tell his name and working experience.';

 let SavDoc = await CountingModel.create({
  intentName: "LaunchRequest"
});
console.log(SavDoc); 
// await  data.save((err)=>{
//   if (!err){
//     console.log("data is saved")
//   }
//   else{
//     console.log("Something went wrong while saving data")
//   }

// });




      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'nameintent';
  },
  handle(handlerInput) {
      const speakOutput = 'My name is Muhammad Mudassir Raza,my friends call me mudassir,would like know my work experience';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt('To know my experience say, what is your work experience')
          .getResponse();
  }
};
const workexperHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'work_experience';
  },
  handle(handlerInput) {
      const speakOutput = 'I started working as frontend developer in 2019 as well i learn python 2020 and now i am moving on Ai chatbots';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
  }
};

const  WeatherintentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Weatherintent';
  },
   async handle(handlerInput) {
      // is ma mujha tamam slots mila ga
       const slots = handlerInput.requestEnvelope.request.intent.slots;
       console.log("Slots",slots)
       const cityName =slots.cityName
        console.log("cityName: ", cityName)
        
   try{
        const response  = await   axios.get(`https://api.weatherapi.com/v1/current.json?key=c7c5691d05bf4b8aaf3161855222402&q=${cityName.value}&aqi=no`)
       console.log("data 1",response.data);
      console.log("data 2 ", response.data.current.condition.text);
      console.log( "data 3", response.data.current.temp_c);
      const speakOutput = `In ${cityName.value} temperature is ${response.data.current.temp_c} degree centigrade and weather is ${response.data.current.condition.text}`;
      return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
      }
    catch (error) {
       // handle error
       console.log(error);
  //   const speakOutput = `weather of ${cityName.value} is 27 degree centigrade`;
       return handlerInput.responseBuilder
          .speak("something went wrong")
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
   }
   }
}; 


const bookRoomHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'bookRoom';
  },
 async handle(handlerInput) {
      
       // is ma mujha tamam slots mila ga
       const slots = handlerInput.requestEnvelope.request.intent.slots;
       console.log("Slots",slots)
       const  numberOfPerson =slots.numberOfPerson
    console.log("numberOfPerson ", numberOfPerson)
    
     const  roomType =slots.roomType
     let roomTypeValue = "";
    console.log("roomType ", roomType)
    
      const  arrivalDate =slots.arrivalDate
    console.log("arrivalDate ", arrivalDate)

    // duration comes in this form
    // https://developer.amazon.com/en-US/docs/alexa/custom-skills/slot-type-reference.html#duration
      const  duration =slots.Duration
    console.log("duration", duration)

    // when disable auto delegation

    if ( !numberOfPerson.value) {

      const questions = [
        "please tell me how many persons are you",
        "how many people do you wanna book for",
        "for how many people",
        "how many people?"
      ]
      // look into database
      // we can call an api

      return handlerInput.responseBuilder
        .speak(pluck(questions))
        .reprompt(pluck(questions))
        .getResponse();

    }  

      
      else if (!roomType.value) {
        // ap mujha number of people mil jaa ga to ma yha pr querry laga sakta hon kitna logon ka lia room ha

        const questions = [
          `ok, ${numberOfPerson.value} people. please tell me type of room. we have economy, standard and luxury rooms.`,
          `for ${numberOfPerson.value} person, what type of room would you like to book. we have economy, standard and luxury rooms.`,
          `What type of room would you like to reserve for ${numberOfPerson.value} person. we have economy, standard and luxury rooms.`
        ]
        // look into database
        // we can call an api
  
        return handlerInput.responseBuilder
          .speak(pluck(questions))
          .reprompt(pluck(questions))
          .getResponse();
      } 
      else if (!arrivalDate.value) {

        const questions = [
          "please tell me when you are coming?",
          "please tell me your checkin date?",
          "when you are coming in our hotel?",
          "What is your arrival date?",
        ]
        return handlerInput.responseBuilder
          .speak(pluck(questions))
          .reprompt(pluck(questions))
          .getResponse();
  
      } else if (!duration.value) {
  
        const questions = [
          `ok. ${roomType.value} room for ${numberOfPerson.value} people. how many nights? our checkout time is 11 in the morning`,
          `book room for how many nights? our checkout time is Eleven in the morning`,
          `for how many nights would you like to stay. our checkout time is Eleven in the morning`,
          `for how many nights you will be staying in our hotel. our checkout time is Eleven in the morning `,
        ]
  
        return handlerInput.responseBuilder
          .speak(pluck(questions))
          .reprompt(pluck(questions))
          .getResponse();
      }
  // ----x----x---
      

    let result =   moment.duration(duration.value);
    console.log("moment.js result", result.asDays())

    const vip = ["vip", "hi class", "premium", "best", "luxury"]
    const standard = ["standard", "ordinary", "regular", "normal"]
    const economy = ["economy", "low", "basic", "budget", "cheap"]

    if (vip.includes(roomType)) {
      roomTypeValue = "vip"
    } else if (standard.includes(roomType)) {
      roomTypeValue = "standard"
    } else if (economy.includes(roomType)) {
      roomTypeValue = "economy"
    }







    try{
      let SavDoc = await bookingModel.create({
        nnumberOfPerson:  numberOfPerson.value,
        roomType:  roomTypeValue,
        arrivalDate: arrivalDate.value,
        duration: duration.value,
      });
      console.log("document is save in mongodb"); 

    }
    catch(e){
      console.log("something went wrong while saving booking",e)
    }
      
      const speakOutput = `ok ,your room is book for ${numberOfPerson.value} persons , a ${roomType.value} room for ${result.asDays()} nights and arrival date is ${arrivalDate.value}  `;

      return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt('To know my experience say, what is your work experience')
          .getResponse();
  }
};

const  SingBirthdaySongIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SingBirthdaySong';
  },
  async handle(handlerInput) {

    // https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html

                        // you can test speak on alexa simulator voice tone
                        // break , amazon:emotio
    let speech = `    <speak>      
                      <amazon:emotion name="excited" intensity="high">
                        <s> 
                            happy birthday to you 
                        
                            <break time="200ms"/>
                            
                            happy birthday to you dear Mudassir
                            
                            <break time="100ms"/>
                            
                            happy birthday to you
                        </s> 
                    
                    </amazon:emotion>
                 
                  </speak>`
                      // <audio src="https://firebasestorage.googleapis.com/v0/b/aaftax-774b8.appspot.com/o/voice-recorder-2022-03-20--12-52-55.mp3?alt=media&token=558a1791-debd-4021-a285-3e716844178a" />
// https://voice-recorder.io/    recording software

    return handlerInput.responseBuilder
      .speak(speech)
      // .reprompt()
      .getResponse();

  }
};

const ErrorHandler = {
  canHandle() {
      return true;
  },
  handle(handlerInput, error) {
      const speakOutput = 'Sorry, this is error handler intent. Please try again.';
      console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};




















const skillBuilder = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    workexperHandler,
    WeatherintentHandler,
    bookRoomHandler,
    SingBirthdaySongIntentHandler,
      )
  .addErrorHandlers(
    ErrorHandler
  )
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, false, false);




// https://blue-bird.herokuapp.com/api/v1/webhook-alexa
app.post('/api/v1/webhook-alexa', adapter.getRequestHandlers());

app.use(express.json())
app.get('/profile', (req, res, next) => {
  res.send("this is a profile");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});




// https://momentjs.com/
// https://momentjs.com/docs/#/durations/