import PropsType from "../types/PropsType";

export default function createRouterBtn(props: PropsType): HTMLButtonElement {
  const btn = document.createElement("button");
  Object.assign(btn, props);
  console.log(btn);
  return btn;
}
