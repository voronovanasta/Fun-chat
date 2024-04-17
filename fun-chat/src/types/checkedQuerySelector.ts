export default function checkedQuerySelector(
  parent: Element | Document,
  selector: string,
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error("Selector didn't match any elements.");
  }
  return el;
}
