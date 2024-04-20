import LoginProps from "../../types/LoginProps";
import SocketClass from "../../SocketClass";
import LoginPageView from "./LoginPageView";

export default class LoginPageModel {
  private name: string;

  private password = "";

  private data: LoginProps;

  private view: LoginPageView;

  socket: SocketClass;

  isLogined: boolean;

  constructor(loginView: LoginPageView, socket: SocketClass) {
    this.data = {
      id: "0",
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
    this.isLogined = false;
  }

  sendLoginData() {
    this.data.id += 1;
    this.data.payload.user = {
      login: this.name,
      password: this.password,
    };
    console.log(this.data);
    this.socket.initLogin(this.data);
  }

  updateData() {
    // добавить проверку что прошла авторизация на сервере ,
    // то есть ответ от сервера тру, тогда сораняем в сешнсториддж
    console.log(this.data);
    localStorage.setItem("user", JSON.stringify(this.data));
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
