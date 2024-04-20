import checkedQuerySelector from "../../types/checkedQuerySelector";
import LoginPageModel from "./LoginPageModel";

export default class LoginPageController {
  private container: HTMLElement;

  private model: LoginPageModel;

  private nameErrorContainer: Element | null;

  private surnameErrorContainer: Element | null;

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
  }

  init() {
    this.inputHandler();
    this.loginHandler();
  }

  inputHandler() {
    document.addEventListener("input", (e) => {
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
    // вызвать в модели создание WS и метода отправки данных для авторизации,(создать метод в модели,
    // если от сервера пришла ошибка. ее пказать в форме)
    const link = checkedQuerySelector(this.container, ".login");
    link?.addEventListener("click", (e) => {
      if (e.target === null) {
        throw new Error("target equals null");
      } else {
        this.model.sendLoginData();
      }
    });
  }
}
