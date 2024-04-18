import { RouterOptions } from "./types/RouterOptions";
import LoginPageComponent from "./components/LoginPageComponent";
import LoginPageController from "./pages/LoginPage/LoginPageController";
import LoginPageModel from "./pages/LoginPage/LoginPageModel";
import LoginPageView from "./pages/LoginPage/LoginPageView";
import logoutHandler from "./utils/logoutHandler";
import AboutPageComponent from "./components/AboutPageComponent";
import MainPageComponent from "./components/MainPageComponent";

export default class Router {
  private routes: RouterOptions;

  private container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.routes = {};
  }

  init() {
    this.routes = {
      "/": () => this.launchLogin(),
      "/main": () => this.launchMain(),
      "/about": () => this.launchAbout(),
    };
    window.addEventListener("popstate", () => this.render());
    this.render();
  }

  render() {
    const path = window.location.pathname;
    if (this.routes[path] && this.isLoggedUser()) {
      if (path === "/") {
        this.launchMain();
      } else {
        this.routes[path]();
      }
    } else {
      this.routes[path]();
    }
  }

  launchLogin() {
    this.container.innerHTML = LoginPageComponent();
    const loginView = new LoginPageView(this.container);
    const loginModel = new LoginPageModel(loginView);
    const loginController = new LoginPageController(this.container, loginModel);
    loginController.init();
  }

  launchMain() {
    MainPageComponent(this.container);
    logoutHandler();
  }

  launchAbout() {
    AboutPageComponent(this.container);
  }

  isLoggedUser() {
    return localStorage.getItem("user") !== null;
  }
}
