import MainPageModel from "./MainPageModel";

export default class MainPageController {
  container: HTMLElement;

  model: MainPageModel;

  constructor(container: HTMLElement, model: MainPageModel) {
    this.model = model;
    this.container = container;
  }

  init() {
    this.selectContactHandler();
  }

  selectContactHandler() {
    this.container.addEventListener("click", (e) => {
      const contactsItems =
        this.container.querySelectorAll(".contact-container");
      contactsItems.forEach((el) => el.classList.remove("selected"));
      if (e.target instanceof HTMLDivElement) {
        if (e.target?.classList.contains("contact-container")) {
          e.target.classList.add("selected");
          const userState = this.getUserstate(e.target);
          const selectedContactName = e.target.textContent as string;
          this.model.updateSelectedUserField(selectedContactName, userState);
          this.model.fetchMsgHistory();
        }
      }
    });
  }

  getUserstate(user: HTMLDivElement) {
    if (user.classList.contains("logged")) {
      return "active";
    }

    return "inactive";
  }
}
