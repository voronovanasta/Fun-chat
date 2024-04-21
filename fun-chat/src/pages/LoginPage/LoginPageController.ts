import checkedQuerySelector from "../../types/checkedQuerySelector";
import LoginPageModel from "./LoginPageModel";

export default class LoginPageController {
  private container: HTMLElement;

  private model: LoginPageModel;

  private nameErrorContainer: Element | null;

  private surnameErrorContainer: Element | null;

  private serverErrorContainer: Element;

  private loginBtn: Element;

  constructor(container: HTMLElement, loginModel: LoginPageModel) {
    this.container = container;
    this.model = loginModel;
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
    this.loginHandler();
    this.handleEnterPress();
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
      console.log(e.key);
      if (
        e.key === "Enter" &&
        (input.id === "name" || input.id === "password")
      ) {
        if (this.loginBtn.classList.contains("login-active")) {
          console.log("enter");
          this.model.sendLoginData();
        }
      }
    });
  }

  loginHandler() {
    const link = checkedQuerySelector(this.container, ".login");
    link?.addEventListener("click", () => {
      console.log("press send login");
      this.model.sendLoginData();
    });
  }
}
