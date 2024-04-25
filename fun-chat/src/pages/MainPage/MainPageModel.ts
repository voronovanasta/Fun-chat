import UsersServerResponse from "../../types/UsersSeverResponse";
import User from "../../types/User";
import SessionObject from "../../types/SessionObject";
import MainPageView from "./MainPageView";
import ThirdServerResponse from "../../types/ThirdServerResponse";
import MsgHistoryServerResponse from "../../types/MsgHistoryServerResponse";
import Message from "../../types/Message";
import SendMsgServerResponse from "../../types/SendMsgServerResponse";
import DeliveryServerResponse from "../../types/DeliveryServerResponse";
import ReadServerResponse from "../../types/ReadServerResponse";

export default class MainPageModel {
  socket: WebSocket;

  view: MainPageView;

  loggedContacts: User[];

  unLoggedContacts: User[];

  userName: string;

  selectedUser: string;

  messages: Message[];

  unreadMessages: Message[];

  count: number;

  currentSender: string;

  constructor(view: MainPageView, socket: WebSocket) {
    this.socket = socket;
    this.view = view;
    this.loggedContacts = [];
    this.unLoggedContacts = [];
    this.userName = "";
    this.selectedUser = "";
    this.messages = [];
    this.unreadMessages = [];
    this.count = 0;
    this.currentSender = "";
  }

  init() {
    this.getUserName();
    this.getLoggedContacts();
    this.getUnloggedContacts();
    this.serverMessageHandler();
    this.scrollIntoViewHandler();
  }

  scrollIntoViewHandler() {
    this.view.scrollIntoViewHandler();
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
        | MsgHistoryServerResponse
        | SendMsgServerResponse
        | DeliveryServerResponse
        | ReadServerResponse = JSON.parse(e.data);
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
        this.view.updateMessagesField(this.messages, this.userName);
        this.view.scrollToEnd();
      }

      if (data.type === "MSG_SEND") {
        const { message } = data.payload;
        this.messages.push(message);
        if (
          message.from === this.userName &&
          message.to === this.selectedUser
        ) {
          this.view.renderSentMessage(message);
          this.view.scrollToLastSentMsg(message);
        }
        if (
          message.to === this.userName &&
          message.from === this.selectedUser
        ) {
          console.log("here");
          this.view.renderReceivedMessage(message);
          this.scrollIntoViewHandler();
          this.updateMsgCounter(message);
        }
      }

      if (data.type === "MSG_DELIVER") {
        this.view.updateStatus(
          data.payload.message.id,
          data.payload.message.status,
        );
      }

      if (data.type === "MSG_READ") {
        console.log("read status changed");
        this.view.updateStatus(
          data.payload.message.id,
          data.payload.message.status,
        );
      }
    });
  }

  updateMsgCounter(msg: Message) {
    console.log("update count");
    const sender = msg.from;
    this.currentSender = sender;
    this.view.updateMsgCountperContact(sender);
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

  sendMessage(text: FormDataEntryValue) {
    this.socket.send(
      JSON.stringify({
        id: this.selectedUser,
        type: "MSG_SEND",
        payload: {
          message: {
            to: this.selectedUser,
            text,
          },
        },
      }),
    );
  }

  setReadStatus() {
    this.unreadMessages = this.messages.filter(
      (el) => el.to === this.userName && !el.status.isReaded,
    );

    this.unreadMessages.forEach((el) => {
      this.socket.send(
        JSON.stringify({
          id: el.id,
          type: "MSG_READ",
          payload: {
            message: {
              id: el.id,
            },
          },
        }),
      );
    });
    this.view.removeDividedLine();
    if (this.currentSender) {
      if (this.currentSender === this.userName) {
        this.view.deleteMsgCountperContact(this.currentSender);
      } else {
        this.view.deleteMsgCountperContact(this.currentSender);
      }
    }
  }
}
