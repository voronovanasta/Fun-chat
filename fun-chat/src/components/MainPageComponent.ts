import createRouterBtn from "../utils/createRouterBtn";

const MainPageComponent = (root: HTMLDivElement) => {
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");

  const userName = document.createElement("div");
  const title = document.createElement("h4");
  userName.className = "user";
  header.className = "header";
  title.textContent = "Fun Chat";
  const aboutBtn = createRouterBtn({
    id: "about",
    className: "button aboutBtn target-link",
    textContent: "About",
  });
  const logoutBtn = document.createElement("button");
  logoutBtn.className = "logout button target-link logoutBtn";
  logoutBtn.textContent = "Logout";
  logoutBtn.id = "logout";
  header.append(userName, title, aboutBtn, logoutBtn);

  const usersField = document.createElement("div");
  usersField.className = "users-field";
  const searchInput = document.createElement("input");
  searchInput.id = "search";
  searchInput.type = "text";
  searchInput.placeholder = "Search...";
  const usersList = document.createElement("div");
  usersList.className = "user-list";
  usersField.append(searchInput, usersList);

  const chat = document.createElement("div");
  chat.className = "chat";
  const selectedUser = document.createElement("div");
  selectedUser.className = "selected-user";
  const messagesField = document.createElement("div");
  messagesField.className = "messages-field";
  messagesField.innerHTML = `<p>Choose a contact to start a chat...</p>`;
  const msgFom = document.createElement("form");
  msgFom.id = "message-form";

  const msgInput = document.createElement("input");
  msgInput.type = "text";
  msgInput.id = "message";
  msgInput.name = "content";
  msgInput.placeholder = "Type a message...";
  msgInput.setAttribute("disabled", "disabled");
  const msgSubmitBtn = document.createElement("input");
  msgSubmitBtn.type = "submit";
  msgSubmitBtn.value = "Send";
  msgSubmitBtn.className = "button";
  msgSubmitBtn.id = "submitBtn";
  msgSubmitBtn.setAttribute("disabled", "disabled");

  msgFom.append(msgInput, msgSubmitBtn);
  chat.append(selectedUser, messagesField, msgFom);
  main.append(usersField, chat);
  root.append(header, main, footer);
};

export default MainPageComponent;
