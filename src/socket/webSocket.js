import { v4 as uuid } from 'uuid';
export class WebSocket {
  static async setSocket(io) {
    /*   io.engine.generateId = uuid(); */
    io.on('connection', (socket) => {
      /* listen to event which send from clint. */
      console.log('user connected');

      /* listen to event which send from clint. */
      socket.on('reload', () => {
        /* user who opened connection. */
        io.emit('reloadPage', {}); /* emit event from server */
      });
    });
  }
}
