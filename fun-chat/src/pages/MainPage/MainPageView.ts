import createMsgItem from "../../utils/createMsgItem";
import User from "../../types/User";
import createContact from "../../utils/createContact";
import checkedQuerySelector from "../../types/checkedQuerySelector";
import Message from "../../types/Message";

export default class MainPageView {
  container: HTMLElement;

  userList: HTMLDivElement;

  selectedUserField: HTMLDivElement;

  messagesField: HTMLDivElement;

  messageInput: HTMLInputElement;

  msgSubmitBtn: HTMLInputElement;

  isDividedLine: boolean;

  constructor(container: HTMLElement) {
    this.container = container;
    this.isDividedLine = false;
    this.userList = checkedQuerySelector(
      this.container,
      ".user-list",
    ) as HTMLDivElement;
    this.selectedUserField = checkedQuerySelector(
      this.container,
      ".selected-user",
    ) as HTMLDivElement;

    this.messagesField = checkedQuerySelector(
      this.container,
      ".messages-field",
    ) as HTMLDivElement;

    this.messageInput = checkedQuerySelector(
      this.container,
      "#message",
    ) as HTMLInputElement;

    this.msgSubmitBtn = checkedQuerySelector(
      this.container,
      "#submitBtn",
    ) as HTMLInputElement;
  }

  scrollToLastSentMsg(msg: Message) {
    const lastMessage = checkedQuerySelector(
      this.messagesField,
      `.text[data-id="${msg.id}"]`,
    );

    lastMessage.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }

  scrollIntoViewHandler() {
    if (document.querySelector(".line")) {
      const line = checkedQuerySelector(
        this.messagesField,
        ".line",
      ) as HTMLDivElement;
      (line.nextElementSibling as HTMLElement)?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }

  showUserName(userName: string) {
    const userElement = checkedQuerySelector(this.container, ".user");
    userElement.textContent = userName;
  }

  showContacts(
    loggedUsers: User[],
    unloggedUsers: User[],
    currentUser: string,
  ) {
    this.userList.innerHTML = "";
    loggedUsers.forEach((user) => {
      if (user.login !== currentUser) {
        const userContainer = createContact(user);
        this.userList.append(userContainer);
      }
    });

    unloggedUsers.forEach((user) => {
      const userContainer = createContact(user);
      this.userList.append(userContainer);
    });
  }

  updateSelectedUserField(name: string, state: string) {
    if (state === "active") {
      this.selectedUserField.classList.remove("unlogged");
      this.selectedUserField.classList.add("logged");
    } else {
      this.selectedUserField.classList.remove("logged");
      this.selectedUserField.classList.add("unlogged");
    }
    this.selectedUserField.innerHTML = `<p>${name} - </p><span>${state}</span>`;
  }

  updateMessagesField(messages: Message[], currentUser: string) {
    if (messages.length === 0) {
      this.messagesField.innerHTML = `<p>No messages so far with this contact.Start a chat now!</p>`;
    } else {
      this.messagesField.innerHTML = "";
      messages.forEach((msg) => {
        if (msg.from === currentUser) {
          this.renderSentMessage(msg);
        }

        if (msg.to === currentUser) {
          this.renderReceivedMessage(msg);
        }
      });
    }
  }

  updateMsgForm() {
    this.messageInput.removeAttribute("disabled");
    this.msgSubmitBtn.removeAttribute("disabled");
  }

  renderSentMessage(msg: Message) {
    this.messagesField.append(createMsgItem(msg, "right"));
  }

  renderReceivedMessage(msg: Message) {
    console.log("render received msg");
    if (!msg.status.isReaded && !this.isDividedLine) {
      this.drawDividedLine();
      this.isDividedLine = true;
    }
    this.messagesField.append(createMsgItem(msg, "left"));
  }

  updateStatus(
    msgId: string,
    status: { isDelivered?: boolean; isReaded?: boolean; isEdited?: boolean },
  ) {
    const textEl = checkedQuerySelector(
      this.messagesField,
      `.text[data-id="${msgId}"]`,
    );
    const parent = textEl.parentElement;
    if (parent === null) throw new Error("Parent not found.");
    const deliveryStatus = checkedQuerySelector(parent, "#delivery-status");
    if (status.isDelivered) {
      deliveryStatus.textContent = "delivered";
    }

    if (
      status.isReaded &&
      deliveryStatus.getAttribute("data-sender") === "you"
    ) {
      deliveryStatus.textContent = "read";
    }

    if (status.isEdited) {
      const text = deliveryStatus.textContent;
      deliveryStatus.textContent = `edited  ${text}`;
    }
  }

  drawDividedLine() {
    console.log("draw a line");
    const line = document.createElement("div");
    line.textContent = "Unread messages";
    line.className = "line";
    this.messagesField.append(line);
  }

  removeDividedLine() {
    console.log(this.isDividedLine);
    if (this.isDividedLine && document.querySelector(".line")) {
      const line = checkedQuerySelector(
        this.container,
        ".line",
      ) as HTMLDivElement;
      console.log("line deleted");
      line.remove();
      this.isDividedLine = false;
    }
  }
}
