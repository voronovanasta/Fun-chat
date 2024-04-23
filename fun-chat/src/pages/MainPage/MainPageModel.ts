import UsersServerResponse from "../../types/UsersSeverResponse";
import User from "../../types/User";
import SessionObject from "../../types/SessionObject";
import MainPageView from "./MainPageView";
import ThirdServerResponse from "../../types/ThirdServerResponse";
import MsgHistoryServerResponse from "../../types/MsgHistoryServerResponse";
import Message from "../../types/Message";

export default class MainPageModel {
  socket: WebSocket;

  view: MainPageView;

  loggedContacts: User[];

  unLoggedContacts: User[];

  userName: string;

  selectedUser: string;

  messages: Message[];

  constructor(view: MainPageView, socket: WebSocket) {
    this.socket = socket;
    this.view = view;
    this.loggedContacts = [];
    this.unLoggedContacts = [];
    this.userName = "";
    this.selectedUser = "";
    this.messages = [];
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
    this.socket.addEventListener("open", () => {
      const data = sessionStorage.getItem("user") as string;
      const sessionData: SessionObject = JSON.parse(data);
      this.socket.send(
        JSON.stringify({
          id: sessionData.id,
          type: "USER_LOGIN",
          payload: {
            user: {
              login: sessionData.user,
              password: sessionData.password,
            },
          },
        }),
      );
      this.getLoggedContacts();
      this.getUnloggedContacts();
    });
    this.socket.addEventListener("message", (e) => {
      const data:
        | UsersServerResponse
        | ThirdServerResponse
        | MsgHistoryServerResponse = JSON.parse(e.data);
      if (data.type === "USER_ACTIVE") {
        this.loggedContacts = data.payload.users;
        this.view.showContacts(
          this.loggedContacts,
          this.unLoggedContacts,
          this.userName,
        );
      }

      if (data.type === "USER_INACTIVE") {
        this.unLoggedContacts = data.payload.users;
        this.view.showContacts(
          this.loggedContacts,
          this.unLoggedContacts,
          this.userName,
        );
      }

      if (
        data.type === "USER_EXTERNAL_LOGIN" ||
        data.type === "USER_EXTERNAL_LOGOUT"
      ) {
        this.getLoggedContacts();
        this.getUnloggedContacts();
        this.view.showContacts(
          this.loggedContacts,
          this.unLoggedContacts,
          this.userName,
        );
      }

      if (data.type === "MSG_FROM_USER") {
        this.messages = data.payload.messages;
        this.view.updateMessagesField(this.messages);
      }
    });
  }

  getLoggedContacts() {
    if (this.socket.readyState === 1) {
      this.socket.send(
        JSON.stringify({
          id: "USER_ACTIVE",
          type: "USER_ACTIVE",
          payload: null,
        }),
      );
    }
  }

  getUnloggedContacts() {
    if (this.socket.readyState === 1) {
      this.socket.send(
        JSON.stringify({
          id: "USER_INACTIVE",
          type: "USER_INACTIVE",
          payload: null,
        }),
      );
    }
  }

  updateSelectedUserField(name: string, state: "active" | "inactive") {
    this.selectedUser = name;
    this.view.updateSelectedUserField(this.selectedUser, state);
    this.view.updateMsgForm();
  }

  fetchMsgHistory() {
    this.socket.send(
      JSON.stringify({
        id: this.selectedUser,
        type: "MSG_FROM_USER",
        payload: {
          user: {
            login: this.selectedUser,
          },
        },
      }),
    );
  }
}
