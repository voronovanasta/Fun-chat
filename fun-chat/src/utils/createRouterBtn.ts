import PropsType from "../types/PropsType";

export default function createRouterBtn(props: PropsType): HTMLAnchorElement {
  const btn = document.createElement("a");
  Object.assign(btn, props);
  console.log(btn);
  return btn;
}
