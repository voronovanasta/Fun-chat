import checkedQuerySelector from "../../types/checkedQuerySelector";

export default class MainPageView {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  showUserName(userName: string) {
    const userElement = checkedQuerySelector(this.container, ".user");
    userElement.textContent = userName;
  }
}
