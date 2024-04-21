import checkedQuerySelector from "../../types/checkedQuerySelector";
import LoginPageModel from "./LoginPageModel";

export default class LoginPageController {
  private container: HTMLElement;

  private model: LoginPageModel;

  private nameErrorContainer: Element | null;

  private surnameErrorContainer: Element | null;

  private serverErrorContainer: Element;

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
  }

  init() {
    this.inputHandler();
    this.loginHandler();
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

  loginHandler() {
    const link = checkedQuerySelector(this.container, ".login");
    link?.addEventListener("click", () => {
      console.log("press send login");
      this.model.sendLoginData();
    });
  }
}
