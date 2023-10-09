import http from "http";

const handleServer: http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse> = (req, res) => {
  res.write(`<p>Welcome to node js</p>`);
  return res.end();
  //after ending the response, it we try to write something to it, it will throw an error.
};

//1. create server
const server = http.createServer(handleServer);

//2. Listen to server
server.listen(3001);
