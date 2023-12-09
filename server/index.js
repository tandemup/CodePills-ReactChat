const http = require("http");

const server = http.createServer();

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  /*   socket.broadcast.emit("chat_message", {
    usuario: "INFO",
    mensaje: "Se ha conectado un nuevo usuario",
  });
 */
  socket.on("chat_message", (data) => {
    console.log("Mensaje recibido", data);
    //io.emit("chat_message", data);
  });
});

server.listen(PORT, () => console.log(`💬 server on port ${PORT}`));
