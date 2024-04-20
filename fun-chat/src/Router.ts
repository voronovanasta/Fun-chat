import { RouterOptions } from "./types/RouterOptions";
import LoginPageComponent from "./components/LoginPageComponent";
import LoginPageController from "./pages/LoginPage/LoginPageController";
import LoginPageModel from "./pages/LoginPage/LoginPageModel";
import LoginPageView from "./pages/LoginPage/LoginPageView";
import AboutPageComponent from "./components/AboutPageComponent";
import MainPageComponent from "./components/MainPageComponent";
import SocketClass from "./SocketClass";

export default class Router {
  private routes: RouterOptions;

  private container: HTMLDivElement;

  socket: SocketClass;

  url: string;

  constructor(container: HTMLDivElement, socket: SocketClass) {
    this.container = container;
    this.routes = {};
    this.socket = socket;
    this.url = "";
  }

  init() {
    this.routes = {
      "/": () => this.launchLogin(),
      "/main": () => this.launchMain(),
      "/about": () => this.launchAbout(),
    };
    this.buttonsHandler();
    window.addEventListener("popstate", () => this.render());
    this.render();
  }

  buttonsHandler() {
    document.addEventListener("click", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const btn: HTMLButtonElement = e.target as HTMLButtonElement;
      switch (btn.id) {
        case "/main":
          this.changeUrl("/main");
          break;
        case "/about":
          console.log("переход через батон");
          this.changeUrl("/about");
          break;
        case "/":
          console.log("переход через батон");
          this.changeUrl("/");
          break;
        default:
          break;
      }
    });
  }

  changeUrl(newUrl: string) {
    this.url = newUrl;
    window.history.pushState({ path: this.url }, "", this.url);
    console.log(window.location.pathname);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    console.log("render");
    if (path === "/main" && this.isLoggedUser()) {
      console.log("переход на мейн");
      this.launchMain();
    } else {
      console.log("переход через елс");
      this.routes[path]();
    }
  }

  launchLogin() {
    this.container.innerHTML = LoginPageComponent();
    const loginView = new LoginPageView(this.container);
    const loginModel = new LoginPageModel(loginView, this.socket);
    const loginController = new LoginPageController(this.container, loginModel);
    loginController.init();
  }

  launchMain() {
    this.container.innerHTML = "";
    MainPageComponent(this.container);
  }

  launchAbout() {
    this.container.innerHTML = "";
    AboutPageComponent(this.container);
  }

  isLoggedUser() {
    console.log("isLoggedUser");
    console.log(localStorage.getItem("user"));
    return localStorage.getItem("user") !== null;
  }
}
