import LoginProps from "../../types/LoginProps";
import LoginPageView from "./LoginPageView";

export default class LoginPageModel {
  private name: string;

  private password = "";

  private data: LoginProps;

  private view: LoginPageView;

  socket: WebSocket;

  constructor(loginView: LoginPageView, socket: WebSocket) {
    this.data = {
      id: "",
      type: "USER_LOGIN",
      payload: {
        user: {
          login: "",
          password: "",
        },
      },
    };
    this.name = "";
    this.password = "";
    this.view = loginView;
    this.socket = socket;
  }

  sendLoginData() {
    this.data.id = this.name;
    this.data.payload.user = {
      login: this.name,
      password: this.password,
    };
    console.log(this.data);
    this.socket.send(JSON.stringify(this.data));
  }

  updateName(name: string) {
    this.name = name;
    this.checkLoginBtnState();
  }

  updateSurname(password: string) {
    this.password = password;
    this.checkLoginBtnState();
  }

  isValidText(str: string) {
    const strWithoutSpaces = str.replace(/\s/g, "");
    const reg = "^[a-zA-Z-]+$";
    const regex = new RegExp(reg);
    return regex.test(strWithoutSpaces);
  }

  isFirstLetterUpperCase(str: string) {
    const firstLetter = str.slice(0, 1);
    return firstLetter === firstLetter.toUpperCase();
  }

  isNameOfValidLength(str: string) {
    return str.length >= 3;
  }

  isSurnameOfValidLength(str: string) {
    return str.length >= 4;
  }

  validateInput(id: "name" | "password", str: string) {
    if (!this.isNameOfValidLength(str)) {
      const p = document.createElement("p");
      p.innerHTML =
        id === "name"
          ? "There are minimum length of 3 characters for this field required."
          : "There are minimum length of 4 characters for this field required.";
      this.view.appendErrorMsg(p, id);
    }

    if (!this.isFirstLetterUpperCase(str)) {
      const p = document.createElement("p");
      p.innerHTML = "The first letter of field is in uppercase required.";
      this.view.appendErrorMsg(p, id);
    }

    if (!this.isValidText(str)) {
      const p = document.createElement("p");
      p.innerHTML =
        " This field only accepts English alphabet letters and the hyphen ('-') symbol.";
      this.view.appendErrorMsg(p, id);
    }

    if (id === "name") {
      return !!(
        this.isNameOfValidLength(str) &&
        this.isFirstLetterUpperCase(str) &&
        this.isValidText(str)
      );
    }

    if (id === "password") {
      return !!(
        this.isSurnameOfValidLength(str) &&
        this.isFirstLetterUpperCase(str) &&
        this.isValidText(str)
      );
    }
    return false;
  }

  checkLoginBtnState() {
    if (this.name && this.password) {
      this.view.updateLoginBtn();
    }
  }
}
