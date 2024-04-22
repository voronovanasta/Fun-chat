import UsersServerResponse from "../../types/UsersSeverResponse";
import User from "../../types/User";
import SessionObject from "../../types/SessionObject";
import MainPageView from "./MainPageView";

export default class MainPageModel {
  socket: WebSocket;

  view: MainPageView;

  loggedContacts: User[];

  unLoggedContacts: User[];

  userName: string;

  constructor(view: MainPageView, socket: WebSocket) {
    this.socket = socket;
    this.view = view;
    this.loggedContacts = [];
    this.unLoggedContacts = [];
    this.userName = "";
  }

  init() {
    this.getUserName();
    this.getLoggedContacts();
    this.getUnloggedContacts();
    this.serverMessageHandler();
  }

  getUserName() {
    const data = sessionStorage.getItem("user") as string;
    const sessionData: SessionObject = JSON.parse(data);
    this.userName = sessionData.user;
    this.view.showUserName(this.userName);
  }

  serverMessageHandler() {
    this.socket.addEventListener("message", (e) => {
      const data: UsersServerResponse = JSON.parse(e.data);
      if (data.type === "USER_ACTIVE") {
        this.loggedContacts = data.payload.users;
        console.log(this.loggedContacts);
      }

      if (data.type === "USER_INACTIVE") {
        this.unLoggedContacts = data.payload.users;
        console.log(this.unLoggedContacts);
      }
    });
  }

  getLoggedContacts() {
    this.socket.send(
      JSON.stringify({
        id: "USER_ACTIVE",
        type: "USER_ACTIVE",
        payload: null,
      }),
    );
  }

  getUnloggedContacts() {
    this.socket.send(
      JSON.stringify({
        id: "USER_INACTIVE",
        type: "USER_INACTIVE",
        payload: null,
      }),
    );
  }
}
