import MainPageComponent from "../../components/MainPageComponent";
import ServerResponse from "../../types/ServerResponse";
import checkedQuerySelector from "../../types/checkedQuerySelector";
import MainPageController from "../MainPage/MainPageController";
import MainPageModel from "../MainPage/MainPageModel";
import MainPageView from "../MainPage/MainPageView";
import LoginPageModel from "./LoginPageModel";

export default class LoginPageController {
  private container: HTMLDivElement;

  private model: LoginPageModel;

  private nameErrorContainer: Element | null;

  private surnameErrorContainer: Element | null;

  private serverErrorContainer: Element;

  private loginBtn: Element;

  socket: WebSocket;

  userId: string;

  constructor(
    container: HTMLDivElement,
    loginModel: LoginPageModel,
    socket: WebSocket,
  ) {
    this.container = container;
    this.model = loginModel;
    this.socket = socket;
    this.userId = "";
    this.nameErrorContainer = checkedQuerySelector(
      document,
      "#errorNameMessage",
    );
    this.surnameErrorContainer = checkedQuerySelector(
      document,
      "#errorSurnameMessage",
    );
    this.serverErrorContainer = checkedQuerySelector(
      document,
      "#errorServerMessage",
    );

    this.loginBtn = checkedQuerySelector(this.container, ".login");
  }

  init() {
    this.inputHandler();
    this.serverMsgHandler();
    this.loginHandler();
    this.handleEnterPress();
  }

  serverMsgHandler() {
    this.socket.addEventListener("message", (event) => {
      const data: ServerResponse = JSON.parse(event.data);
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

        window.history.pushState({ path: "/main" }, "", "/main");
        this.container.innerHTML = "";
        MainPageComponent(this.container);
        const mainPageView = new MainPageView(this.container);
        const mainPageModel = new MainPageModel(mainPageView, this.socket);
        const mainPageController = new MainPageController(
          this.container,
          mainPageModel,
        );
        mainPageModel.init();
        mainPageController.init();
      }

      if (data.type === "ERROR" && data.id === this.userId) {
        if (
          data.payload.error !== undefined &&
          this.serverErrorContainer !== null
        ) {
          this.serverErrorContainer.innerHTML = data.payload.error;
        }
      }
    });
  }

  inputHandler() {
    document.addEventListener("input", (e) => {
      this.serverErrorContainer.innerHTML = "";
      if (e.target === null) throw new Error("target equals null");
      const input: HTMLInputElement = e.target as HTMLInputElement;

      switch (input.id) {
        case "name":
          if (this.nameErrorContainer !== null) {
            this.nameErrorContainer.innerHTML = "";
            if (this.model.validateInput(input.id, input.value)) {
              this.model.updateName(input.value);
            }
          }
          break;
        case "password":
          if (this.surnameErrorContainer !== null) {
            this.surnameErrorContainer.innerHTML = "";
            if (this.model.validateInput(input.id, input.value)) {
              this.model.updateSurname(input.value);
            }
          }
          break;
        default:
          break;
      }
    });
  }

  handleEnterPress() {
    document.addEventListener("keydown", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const input: HTMLInputElement = e.target as HTMLInputElement;
      if (
        e.key === "Enter" &&
        (input.id === "name" || input.id === "password")
      ) {
        if (this.loginBtn.classList.contains("login-active")) {
          this.model.sendLoginData();
        }
      }
    });
  }

  loginHandler() {
    const link = checkedQuerySelector(this.container, ".login");
    link?.addEventListener("click", () => {
      this.model.sendLoginData();
    });
  }
}
