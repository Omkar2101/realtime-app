let socket: WebSocket;


//create the connection once
export const connectSocket =() =>{
    socket = new WebSocket('ws://localhost:8080');
    socket.onopen=() =>{
        console.log('WebSocket connection established');
}
}


//i want to send message from client to server
export const sendMessage = (message: string) => {
    if (!socket) return;
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'message',
            payload:message
        }));
    }
}

//recieve broadcast message
//it measns it is a listener do this when message comes and takes the callback
export const onMessage = (callback: (msg: string) => void) => {
  if (!socket) return;

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(event,"from the onMessage");
    

    if (data.type === "message") {
      callback(data.payload);
    }
  };
};