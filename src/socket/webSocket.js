import { AuthenticateWebSocket } from '/skills/study/projects/asisapp/asisapp_api/shared/middleware/auth.middleware.js';

export class WebSocket {
  static async setSocket(io) {
    io.on('connection', async (socket) => {
      /* listen to event which send from clint. */
      console.log('user connected');

      const isAllowed = await AuthenticateWebSocket(socket);

      if (!isAllowed) {
        socket.disconnect();
      }

      /* listen to event which send from clint. */
      socket.on('reload', () => {
        /* user who opened connection. */
        io.emit('reloadPage', {}); /* emit event from server */
      });
    });
  }
}
