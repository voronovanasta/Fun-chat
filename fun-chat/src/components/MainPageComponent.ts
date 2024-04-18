import createRouterBtn from "../utils/createRouterBtn";

const MainPageComponent = (root: HTMLDivElement) => {
  const mainContentContainer = document.createElement("div");
  mainContentContainer.className = "about";
  mainContentContainer.textContent = "CHAT";
  const aboutBtn = createRouterBtn({
    href: "/about",
    className: "button aboutBtn target-link",
    id: "about",
    textContent: "About",
  });
  const logoutBtn = createRouterBtn({
    href: "/",
    className: "logout target-link",
    id: "logoutBtn",
    textContent: "Logout",
  });
  mainContentContainer.append(aboutBtn, logoutBtn);
  root.append(mainContentContainer);
};

export default MainPageComponent;
