import User from "../types/User";

export default function createContact(contact: User) {
  const container = document.createElement("div");
  const count = document.createElement("div");
  count.id = "count";
  container.className = "contact-container";
  container.id = contact.login;
  let name = contact.login;
  if (name.length > 10) {
    name = contact.login.slice(0, 10);
  }
  container.textContent = name;
  if (contact.isLogined) {
    container.classList.add("logged");
  } else {
    container.classList.add("unlogged");
  }
  container.append(count);
  return container;
}
