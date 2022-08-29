import express from "express";
import morgan  from "morgan";
import  { WebhookClient }  from 'dialogflow-fulfillment'; 
// const { WebhookClient } =  pkg;
// import * as DfFulfillment from 'dialogflow-fulfillment';

// const WebhookClient = new DfFulfillment.WebhookClient({});
 
// import {dialogflow} from 'actions-on-google';
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/",(req,res) =>{
    res.send("Hello world");
});

app.listen(3000,()=>{
    console.log("Example app listening on port 3000!");
    
});
// ab iska route ka through hum dialog flow sa  request mangwara ha

// https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook
// https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook-nodejs
app.post("/webhook",(request,response)=>{
    const _agent = new WebhookClient({request,response});
    // const _agent = new WebhookClient({req,res});

    function welcome(agent) {
        agent.add(`Welcome to my Pizza shop!`);
      }
      
    function order(agent) {
         
        const  pizzaFlavors =agent.parameters.pizzaFlavors;
        const  qty =agent.parameters.qty;
        const   PizzaSize  =agent.parameters.PizzaSize;

        console.log("qty=>",qty);
        console.log("PizzaSize=>",PizzaSize);
        console.log("pizzaFlavors=>",pizzaFlavors);
        
        agent.add(`Response from server, here is your order for ${qty} ${PizzaSize} ${pizzaFlavors} pizza.Your order is placed successfully!`);
     

      }
     
      function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
      }
      let intentMap = new Map();
      intentMap.set('Default Welcome Intent', welcome);
      intentMap.set('PlaceOrder', order);
      intentMap.set('Default Fallback Intent', fallback);
      // intentMap.set('your intent name here', yourFunctionHandler);
      // intentMap.set('your intent name here', googleAssistantHandler);
      _agent.handleRequest(intentMap);
    
      
 
     
         
    


    
    


});
