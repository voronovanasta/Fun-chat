import { RouterOptions } from "./types/RouterOptions";
import LoginPageComponent from "./components/LoginPage/LoginPageComponent";
import LoginPageController from "./pages/LoginPage/LoginPageController";
import LoginPageModel from "./pages/LoginPage/LoginPageModel";
import LoginPageView from "./pages/LoginPage/LoginPageView";
import StartPageComponent from "./components/StartPage/StartPageComponent";
import GamePageComponent from "./components/GamePage/GamePageComponent";
import logoutHandler from "./utils/logoutHandler";
import showGreeting from "./utils/showGreeting";

export default class Router {
  private routes: RouterOptions;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.routes = {};
  }

  init() {
    this.routes = {
      "/": () => this.launchLogin(),
      "/start": () => this.launchStart(),
      "/game": () => this.launchGame(),
      // "/statistics": this.launchStats
    };
    window.addEventListener("popstate", () => this.render());
    this.render();
  }

  render() {
    const path = window.location.pathname;
    if (this.routes[path] && this.isLoggedUser()) {
      if (path === "/") {
        this.launchStart();
      } else {
        this.routes[path]();
      }
    } else {
      this.launchLogin();
    }
  }

  launchLogin() {
    this.container.innerHTML = LoginPageComponent();
    const loginView = new LoginPageView(this.container);
    const loginModel = new LoginPageModel(loginView);
    const loginController = new LoginPageController(this.container, loginModel);
    loginController.init();
  }

  launchStart() {
    this.container.innerHTML = StartPageComponent();
    logoutHandler();
    showGreeting();
  }

  launchGame() {
    this.container.innerHTML = GamePageComponent();
    logoutHandler();
  }

  isLoggedUser() {
    return localStorage.getItem("user") !== null;
  }
}
