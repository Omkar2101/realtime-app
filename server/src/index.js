import WebSocket,{WebSocketServer} from "ws";
import { verifyToken } from "./utils/jwt.js";

// Create WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

console.log("✅ WebSocket server running on ws://localhost:8080");

//So, wss.on is for server-level events (like new connections),
//  while socket.on is for events on each individual client connection (like messages or disconnects).
//  Both use the on method, but on different objects for different purposes.

wss.on("connection", (socket) => {
    console.log("🔗 New client connected")
    
    // Listen for messages from clients
    socket.on("message", (data) => {
        console.log(`📩 Received: ${data}`);

        //data is buffer so convert to string then  to json so now the message is a json object
        const message = JSON.parse(data.toString());
        
        

        console.log("chat message form the user",message);

        //message we decoded now we have to send it to all the sockets/clients connected to this server

        //we know wss.clients gives all the connected clients
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                //send that msg to the client
                client.send(JSON.stringify({
                    type: "message",
                    payload: message.payload
                }));
            }
        })
        
    });
    
    //when client disconnet
    socket.on("close", () => {
        console.log("❌ Client disconnected");
    });

});