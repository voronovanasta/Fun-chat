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

  constructor(container: HTMLElement) {
    this.container = container;
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
    console.log(state);
    if (state === "active") {
      this.selectedUserField.classList.remove("unlogged");
      this.selectedUserField.classList.add("logged");
    } else {
      this.selectedUserField.classList.remove("logged");
      this.selectedUserField.classList.add("unlogged");
    }
    this.selectedUserField.innerHTML = `<h6>${name}</h6><span>${state}</span>`;
  }

  updateMessagesField(messages: Message[]) {
    if (messages.length === 0) {
      this.messagesField.innerHTML = `<p>No messages so far with this contact.Start a chat now!</p>`;
    } else {
      messages.forEach((msg) => {
        this.messagesField.append(createMsgItem(msg));
      });
    }
  }

  updateMsgForm() {
    this.messageInput.removeAttribute("disabled");
    this.msgSubmitBtn.removeAttribute("disabled");
  }
}
