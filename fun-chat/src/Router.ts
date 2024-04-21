import { RouterOptions } from "./types/RouterOptions";
import LoginPageComponent from "./components/LoginPageComponent";
import LoginPageController from "./pages/LoginPage/LoginPageController";
import LoginPageModel from "./pages/LoginPage/LoginPageModel";
import LoginPageView from "./pages/LoginPage/LoginPageView";
import AboutPageComponent from "./components/AboutPageComponent";
import MainPageComponent from "./components/MainPageComponent";
import ServerResponse from "./types/ServerResponse";
import checkedQuerySelector from "./types/checkedQuerySelector";
import LoginProps from "./types/LoginProps";
import SessionObject from "./types/SessionObject";

export default class Router {
  private routes: RouterOptions;

  private container: HTMLDivElement;

  socket: WebSocket;

  url: string;

  userId: string;

  serverErrorContainer: Element | null;

  userData: LoginProps;

  prevUrl: string;

  constructor(container: HTMLDivElement, socket: WebSocket) {
    this.container = container;
    this.routes = {};
    this.socket = socket;
    this.url = "";
    this.prevUrl = "";
    this.userId = "";
    this.serverErrorContainer = null;
    this.userData = {
      id: "",
      type: "USER_LOGOUT",
      payload: {
        user: {
          login: "",
          password: "",
        },
      },
    };
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
    this.serverMsgHandler();
  }

  serverMsgHandler() {
    this.socket.onmessage = (event) => {
      const data: ServerResponse = JSON.parse(event.data);
      console.log(data.id === this.userId);
      if (data.type === "USER_LOGIN" && data.payload.user?.isLogined) {
        this.userId = data.id;
        const name: HTMLInputElement = checkedQuerySelector(
          document,
          "#name",
        ) as HTMLInputElement;
        const password: HTMLInputElement = checkedQuerySelector(
          document,
          "#password",
        ) as HTMLInputElement;
        const storageData = {
          id: name.value,
          user: name.value,
          password: password.value,
        };
        sessionStorage.setItem("user", JSON.stringify(storageData));
        this.changeUrl("/main");
      }

      if (data.type === "USER_LOGOUT" && !data.payload.user?.isLogined) {
        this.changeUrl("/");
        sessionStorage.clear();
      }

      if (data.type === "ERROR" && data.id === this.userId) {
        if (
          data.payload.error !== undefined &&
          this.serverErrorContainer !== null
        ) {
          this.serverErrorContainer.innerHTML = data.payload.error;
        }
      }
      console.log(data);
    };
  }

  buttonsHandler() {
    document.addEventListener("click", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const btn: HTMLButtonElement = e.target as HTMLButtonElement;
      switch (btn.id) {
        case "return":
          console.log(this.prevUrl);
          this.changeUrl(this.prevUrl);
          break;
        case "logout":
          this.sendLogout();
          break;
        case "about":
          this.prevUrl = this.url;
          this.changeUrl("/about");
          break;
        default:
          break;
      }
    });
  }

  sendLogout() {
    const data = sessionStorage.getItem("user") as string;

    const sessionData: SessionObject = JSON.parse(data);
    this.userData.id = sessionData.id.trim();
    this.userData.payload.user.login = sessionData.user.trim();
    this.userData.payload.user.password = sessionData.password.trim();

    this.socket.send(JSON.stringify(this.userData));
  }

  changeUrl(newUrl: string) {
    this.url = newUrl;
    window.history.pushState({ path: this.url }, "", this.url);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    this.url = path;

    if (path === "/main" && this.isLoggedUser()) {
      console.log("c проверкой логина");
      this.launchMain();
    } else {
      console.log("без проверки");
      this.routes[path]();
    }
  }

  launchLogin() {
    this.container.innerHTML = LoginPageComponent();
    this.serverErrorContainer = checkedQuerySelector(
      document,
      "#errorServerMessage",
    );
    console.log(this.serverErrorContainer);
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
    return sessionStorage.getItem("user") !== null;
  }
}
