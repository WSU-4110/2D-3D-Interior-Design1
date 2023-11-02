const express = require('express');
const path = require('path');
const webserver = express();

webserver.use(express.static(path.join(__dirname + '/public')));

webserver.use(()=> {
  res.status(404);
  res.send(`<h1> Error 404: Source not found</h1>`);
})

webserver.listen(9999, () => {
  console.log("App listening on port 9999");
})





 

/*
const fs = require('fs')
const server = net.createServer((socket) => {
  let requestString = '';

  socket.on("data", (buffer) => {
    requestString += buffer.toString('utf-8');
    
    // Check if the requestString ends with two newline characters
    if (requestString.endsWith('\n')) {
      const request = parseRequest(requestString);
      console.log(request.method,request.path,request.protocol);
      
      if (request.method === "GET" && request.path ==="/"){
        if(fs.existsSync(`.${request.path}`))
        socket.write("HTTP/1.0 200 OK");
      } else{
        socket.write("HTTP/1.0 404 not found");
      }
      
      // Reset the requestString for the next request
      requestString = '';
    }
  });
});

const parseRequest = (requestString) => {
  const [method, path, protocol] = requestString.split(" ");

  return {
    method,
    path,
    protocol
  };
};

server.listen(9999, () => console.log("Listening"));

*/