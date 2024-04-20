import LoginProps from "./types/LoginProps";

export default class SocketClass {
  socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    console.log(this.socket);
  }

  initLogin(loginProps: LoginProps) {
    console.log("initlogin");
    this.socket.onopen = (event) => {
      console.log(event.type);
      this.socket.send(JSON.stringify(loginProps));
    };
  }
}
