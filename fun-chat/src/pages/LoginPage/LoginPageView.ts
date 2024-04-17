import checkedQuerySelector from "../../types/checkedQuerySelector";

export default class LoginPageView {
  private nameErrorContainer: Element | null;

  private surnameErrorContainer: Element | null;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.nameErrorContainer = checkedQuerySelector(
      this.container,
      "#errorNameMessage",
    );
    this.surnameErrorContainer = checkedQuerySelector(
      this.container,
      "#errorSurnameMessage",
    );
  }

  appendErrorMsg(msg: Node, id: string) {
    if (id === "name") {
      this.nameErrorContainer?.append(msg);
    } else {
      this.surnameErrorContainer?.append(msg);
    }
  }

  updateLoginBtn() {
    const loginBtn = checkedQuerySelector(this.container, "#login");
    loginBtn?.classList.add("login-active");
  }
}
