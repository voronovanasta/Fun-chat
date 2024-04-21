import createRouterBtn from "../utils/createRouterBtn";

const MainPageComponent = (root: HTMLDivElement) => {
  const mainContentContainer = document.createElement("div");
  mainContentContainer.className = "about";
  mainContentContainer.textContent = "CHAT";
  const aboutBtn = createRouterBtn({
    id: "about",
    className: "button aboutBtn target-link",
    textContent: "About",
  });
  const logoutBtn = document.createElement("button");
  logoutBtn.className = "logout target-link logoutBtn";
  logoutBtn.textContent = "Logout";
  logoutBtn.id = "logout";
  mainContentContainer.append(aboutBtn, logoutBtn);
  root.append(mainContentContainer);
};

export default MainPageComponent;
