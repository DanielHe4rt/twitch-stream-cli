import SocketIo from 'socket.io';

class Io {
  constructor(http) {
    this.io = SocketIo(http);

    this.connection();
  }

  connection() {
    this.io.on("connection", () => {
      console.log("a user connected");
    });
  }
}

export default Io;
