export class WebSocket {
  static async setSocket(io) {
    io.on('connection', (socket) => {
      /* listen to event which send from clint. */
      console.log('user connected');
      console.log(socket.handshake.headers);

      /* listen to event which send from clint. */
      socket.on('reload', () => {
        /* user who opened connection. */
        io.emit('reloadPage', {}); /* emit event from server */
      });
    });
  }
}
