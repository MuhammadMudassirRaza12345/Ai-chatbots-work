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
 


mongoose.connect("mongodb+srv://mudassir:mudassir786110@cluster0.6sgt9.mongodb.net/pizzariderdb?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
  })
  mongoose.connection.on("error", () => {
    console.log("mongodb error");
  })

  // schema model
 

// for booking room
const orderSchema = new mongoose.Schema({
   topping: String,
  size: String,
  qty: Number,
  name:String,
  address:String,

  // phonenumber:Number,
   status:{type:String,default:"PENDING"},    // PENDING , PREPARING/CANCEL ,,dISPATCHED , DELIVERED  
  createdOn: { type: Date, default: Date.now },
});
const  orderModel = mongoose.model('Orders', orderSchema);


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
    // console.log("request came: ", JSON.stringify(handlerInput.requestEnvelope));
    console.log("request came :" ,JSON.stringify(handlerInput.requestEnvelope));

    

    const speakOutput = `
    <speak>
      <voice name="Justin">
        <amazon:emotion name="excited" intensity="high">
          <p>
            <s> Hello! </s>
            <s>I'm your Pizza Rider</s>
          </p>
          <p>
            I am here to automate your pizza delivery.
            What would you like to order today?
          </p>
        </amazon:emotion>
      </voice>
    </speak>
`;

return handlerInput.responseBuilder
  .speak(speakOutput)
  .reprompt(speakOutput)
  .getResponse();
}
};

const placeOrderIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'placeOrder';
  },
async handle(handlerInput) {
  console.log("request came: ", JSON.stringify(handlerInput.requestEnvelope));

    // http://ask-sdk-node-typedoc.s3-website-us-east-1.amazonaws.com/
    // http://ask-sdk-node-typedoc.s3-website-us-east-1.amazonaws.com/index.html#getslot

    // const currentIntent = handlerInput.requestEnvelope.request.intent;  
    const topping = Alexa.getSlot(handlerInput.requestEnvelope, "topping");
    const size = Alexa.getSlot(handlerInput.requestEnvelope, "size");
    const qty = Alexa.getSlot(handlerInput.requestEnvelope, "qty");

    console.log("topping :",topping)
    console.log("size:",size)
    console.log("size:",qty)

    if(!topping.value){
      
      const speakOutput = `
      <speak>
        <voice name="Justin">
          <amazon:emotion name="excited" intensity="medium">
            <p>
              <s> What topping would you like to have! </s>
              <s>  we have fajita ,pepperoni and ranch </s>
            </p>
             
          </amazon:emotion>
        </voice>
      </speak>   `;


      
      return handlerInput.responseBuilder
          .speak(speakOutput)
         
          .reprompt(speakOutput)
          .getResponse();



    } else if(!size.value){
      
      const speakOutput = `
      <speak>
      <voice name="Justin">
        <amazon:emotion name="excited" intensity="medium">
          <p>
            <s> ok </s>
            <s>  ${topping.value} pizza, what size would you like to order</s>
            <s> We have Large pizza that serves 4 persons, medium pizza that serves 2 persons, and small pizza  that serves 1 person </s>
          </p>
        </amazon:emotion>
      </voice>
    </speak>   `;


      
      return handlerInput.responseBuilder
          .speak(speakOutput)
          
          .reprompt(speakOutput)
          .getResponse();



    } else if(!qty.value){
      
      const speakOutput = `
      <speak>
      <voice name="Justin">
        <amazon:emotion name="excited" intensity="medium">
        <p>
        <s> ok ${size.value} ${topping.value} pizza </s> 
        <s> How many? </s>
        <s> you can say a number like one, two or three </s>
      </p>
        </amazon:emotion>
      </voice>
    </speak>   `;


      
      return handlerInput.responseBuilder
          .speak(speakOutput)
          
          .reprompt(speakOutput)
          .getResponse();



    }
    else{
      // https://developer.amazon.com/en-US/docs/alexa/custom-skills/request-customer-contact-information-for-use-in-your-skill.html
      
   
 const apiAccessToken = Alexa.getApiAccessToken(handlerInput.requestEnvelope);

 const fullName = await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.name", {
   headers: { Authorization: `Bearer ${apiAccessToken}` }
 })
 const email = await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.email", {
   headers: { Authorization: `Bearer ${apiAccessToken}` }
 })
//   const phonenumber =     await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.mobileNumber",{ 
//      headers :{Autherization :  `Bearer ${apiAccessToken}`}
//     })
        
     console.log("FullName:",fullName.data)  
     console.log("Email :", email.data)
//     console.log("PhoneNumber:",phonenumber.data)




      let savedDoc =await orderModel.create({
        topping:topping.value,
        size:size.value,
        qty:qty.value,
        name:fullName.data,
        address:email.data,
        // phonenumber:phonenumber.data,


      })
      console.log("savedDoc",savedDoc)

          const speakOutput = `
      <speak>
        <voice name="Justin">
          <amazon:emotion name="excited" intensity="medium">
            <p>
              <s> Thankyou! </s>
              <s> ${qty.value} ${size.value} pizza of  ${topping.value}  flavour , your order  is Placed </s>
            </p>
             
          </amazon:emotion>
        </voice>
      </speak>   `;

      return handlerInput.responseBuilder
          .speak(speakOutput)
         .reprompt(speakOutput)
          .getResponse();
  }
  }
};
// ------------------------------------------
const  checkOrderIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'checkOrder';
  },
async handle(handlerInput) {
  console.log("request came: ", JSON.stringify(handlerInput.requestEnvelope));
    
      
       
      // https://developer.amazon.com/en-US/docs/alexa/custom-skills/request-customer-contact-information-for-use-in-your-skill.html
      
   
 const apiAccessToken = Alexa.getApiAccessToken(handlerInput.requestEnvelope);

 const fullName = await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.name", {
   headers: { Authorization: `Bearer ${apiAccessToken}` }
 })
 const email = await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.email", {
   headers: { Authorization: `Bearer ${apiAccessToken}` }
 })
//   const phonenumber =     await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.mobileNumber",{ 
//      headers :{Autherization :  `Bearer ${apiAccessToken}`}
//     })
        
     console.log("FullName:",fullName.data)  
     console.log("Email :", email.data)
//     console.log("PhoneNumber:",phonenumber.data)




      //  hum mongodb ki querry lagaa ga
   const lastorder = await  orderModel.findOne({email:email.data}).
   // -1 means sort in decending order (yani neecha sa sort kra ga) because jo
    // sb sa latest hoga wo db ma last ma tha
    sort({_id:-1})
   .exec()
   console.log("lastorder",lastorder)

      
   const lastOrderDate = moment(lastorder.createdOn).fromNow();  // moment 3 days agao ma convert krda ga.
   console.log("lastOrderDate: ", lastOrderDate);

   let speakOutput = "";

   if (lastorder.status === "DELIVERED") {
     speakOutput = `
       <speak>
         <voice name="Justin">
           <amazon:emotion name="excited" intensity="medium">
             <p>
               <s> Dear customer ${fullName.data}! your last order of 
                   ${lastorder.qty} ${lastorder.topping} pizza was placed ${lastOrderDate}
                   and it was delivered successfully. </s>
               <s>you have no order in progress</s>
               <s>please feel free to say "order pizza" or "repeat my last order" whenever you want</s>
               <s> I am your pizza rider, Happy to help</s>
             </p>
           </amazon:emotion>
         </voice>
       </speak>
       `;
   } else { // PENDING, PREPARING/CANCELED, DISPATCHED, DELIVERED
     speakOutput = `
       <speak>
         <voice name="Justin">
           <amazon:emotion name="excited" intensity="medium">
             <p>
               <s> Dear customer ${fullName.data}! your order of 
                   ${lastorder.qty} ${lastorder.topping} pizza was placed ${lastOrderDate}
                   and it is ${lastorder.status}. </s>
               <s> Please be patient, your order is our highest priority.</s>
             </p>
           </amazon:emotion>
         </voice>
       </speak>
     `;
   }

      return handlerInput.responseBuilder
          .speak(speakOutput)
         .reprompt(speakOutput)
          .getResponse();
  
  }
};
 


// -----------------------------------------
const repeatOrderIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'repeatOrder';
  },
  async handle(handlerInput) {
    console.log("request came: ", JSON.stringify(handlerInput.requestEnvelope));

    const apiAccessToken = Alexa.getApiAccessToken(handlerInput.requestEnvelope);

    const fullName = await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.name", {
      headers: { Authorization: `Bearer ${apiAccessToken}` }
    })
    const email = await axios.get("https://api.amazonalexa.com/v2/accounts/~current/settings/Profile.email", {
      headers: { Authorization: `Bearer ${apiAccessToken}` }
    })

    console.log("fullName: ", fullName.data);
    console.log("email: ", email.data);

    const lastOrder = await orderModel
      .findOne({ email: email.data })
      .sort({ _id: -1 })
      .exec()

    const lastOrderDate = moment(lastOrder.createdOn).fromNow();
    console.log("lastOrderDate: ", lastOrderDate);
    try {


      let speakOutput = "";

      if (handlerInput.requestEnvelope.request.intent.confirmationStatus === "NONE") {

        speakOutput = `
          <speak>
            <voice name="Justin">
              <amazon:emotion name="excited" intensity="medium">
                <p>
                  <s> Dear customer ${fullName.data}! I heard you want to 
                  repeat your last order of ${lastOrder.qty} ${lastOrder.size} ${lastOrder.topping} pizza.</s>
                  <s> is that correct?</s>
                </p>
              </amazon:emotion>
            </voice>
          </speak>
        `;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          // .reprompt(speakOutput)
          .addConfirmIntentDirective(handlerInput.requestEnvelope.request.intent)
          .getResponse();

      } else if (handlerInput.requestEnvelope.request.intent.confirmationStatus === "DENIED") {

        speakOutput = `
          <speak>
            <voice name="Justin">
              <amazon:emotion name="excited" intensity="medium">
                <p>
                  <s> okay, Canceled </s>
                  <s> please feel free to say "order pizza" or "repeat my last order" whenever you want. </s>
                  <s> I am your pizza rider, Happy to help</s>
                </p>
              </amazon:emotion>
            </voice>
          </speak>
        `;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .getResponse();
      } else if (handlerInput.requestEnvelope.request.intent.confirmationStatus === "CONFIRMED") {

        let savedDoc = await orderModel.create({
          topping: lastOrder.topping,
          size: lastOrder.size,
          qty: lastOrder.qty,
          name: fullName.data,
          address: email.data
        })
        console.log("savedDoc: ", savedDoc);

        speakOutput = `
          <speak>
            <voice name="Justin">
              <amazon:emotion name="excited" intensity="medium">
                <p>
                  <s> okay, order placed for ${lastOrder.qty} ${lastOrder.size} ${lastOrder.topping} pizza.</s>
                  <s> Please be patient, your order is our highest priority. </s>
                  <s> you can ask me about your order any time. </s>
                </p>
              </amazon:emotion>
            </voice>
          </speak>
        `;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .getResponse();
      }

    } catch (error) {
      console.log("my error: ", error);
    }

  }
};









// ----------------------------------------------------------
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
    placeOrderIntentHandler,
    checkOrderIntentHandler,
    repeatOrderIntentHandler,
     )
  .addErrorHandlers(
    ErrorHandler
  )
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, false, false);


// import http from 'http';
 
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
// https://github.com/speechmarkdown/speechmarkdown-vscode