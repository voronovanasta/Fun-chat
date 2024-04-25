import checkedQuerySelector from "../../types/checkedQuerySelector";
import MainPageModel from "./MainPageModel";

export default class MainPageController {
  container: HTMLElement;

  model: MainPageModel;

  form: HTMLFormElement;

  messagesField: HTMLDivElement;

  isScrollAllowed: boolean;

  constructor(container: HTMLElement, model: MainPageModel) {
    this.model = model;
    this.container = container;
    this.form = checkedQuerySelector(
      this.container,
      "#message-form",
    ) as HTMLFormElement;
    this.messagesField = checkedQuerySelector(
      this.container,
      ".messages-field",
    ) as HTMLDivElement;
    this.isScrollAllowed = false;
  }

  init() {
    this.selectContactHandler();
    this.messageFormHandler();
    this.scrollHandler();
    this.clickMessagesField();
    this.scrollIntoViewHandler();
  }

  scrollIntoViewHandler() {
    this.messagesField.addEventListener("scrollend", () => {
      if (document.querySelector(".line")) {
        this.isScrollAllowed = true;
        console.log(this.isScrollAllowed);
      }
    });
  }

  scrollHandler() {
    this.messagesField.addEventListener("scroll", () => {
      console.log(this.isScrollAllowed);
      if (this.isScrollAllowed) {
        console.log("back to controller");
        this.model.setReadStatus();
        this.isScrollAllowed = false;
        console.log(this.isScrollAllowed);
      }
    });
  }

  clickMessagesField() {
    this.messagesField.addEventListener("click", () => {
      this.model.setReadStatus();
      this.isScrollAllowed = false;
      console.log(this.isScrollAllowed);
    });
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

  messageFormHandler() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = new FormData(this.form);
      if (e.target === null) throw new Error("target equals null");
      this.model.sendMessage(form.get("content") as FormDataEntryValue);
      this.model.setReadStatus();
      this.isScrollAllowed = false;
      console.log(this.isScrollAllowed);
    });
  }
}
