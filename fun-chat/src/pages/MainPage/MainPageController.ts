import MainPageModel from "./MainPageModel";

export default class MainPageController {
  container: HTMLElement;

  model: MainPageModel;

  constructor(container: HTMLElement, model: MainPageModel) {
    this.model = model;
    this.container = container;
  }

  init() {}
}
