import React,{useState} from "react";

const suggestions={
happy:["Goa","Kerala","Manali"],
sad:["Ooty","Coorg","Darjeeling"],
adventure:["Ladakh","Rishikesh","Spiti"],
romantic:["Udaipur","Munnar","Shimla"]
};

function Chatbot({setDestination}){

const [input,setInput]=useState("");
const [messages,setMessages]=useState([]);

const send=()=>{

let mood=input.toLowerCase();

if(suggestions[mood]){

let places=suggestions[mood].join(", ");

setMessages([
...messages,
{type:"bot",text:`You can plan trip to: ${places}`}
]);

setDestination(suggestions[mood][0]);

}else{

setMessages([
...messages,
{type:"bot",text:"Try moods like happy, sad, adventure"}
]);

}

setInput("");

};

return(

<div style={{position:"fixed",bottom:"20px",right:"20px"}}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Enter mood"
/>

<button onClick={send}>Send</button>

</div>

);

}

export default Chatbot;