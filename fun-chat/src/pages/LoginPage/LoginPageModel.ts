import LoginPageView from "./LoginPageView";

export default class LoginPageModel {
  private data: { [key: string]: string };

  private view: LoginPageView;

  constructor(loginView: LoginPageView) {
    this.data = {};
    this.view = loginView;
  }

  updateData() {
    if (this.data.name && this.data.surname) {
      console.log(this.data);
      localStorage.setItem("user", JSON.stringify(this.data));
    }
  }

  updateName(name: string) {
    this.data.name = name;
    this.checkLoginBtnState();
  }

  updateSurname(surname: string) {
    this.data.surname = surname;
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

  validateInput(id: "name" | "surname", str: string) {
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

    if (id === "surname") {
      return !!(
        this.isSurnameOfValidLength(str) &&
        this.isFirstLetterUpperCase(str) &&
        this.isValidText(str)
      );
    }
    return false;
  }

  checkLoginBtnState() {
    if (this.data.name && this.data.surname) {
      this.view.updateLoginBtn();
    }
  }
}
