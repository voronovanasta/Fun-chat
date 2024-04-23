import User from "../types/User";

export default function createContact(contact: User) {
  const container = document.createElement("div");
  container.className = "contact-container";
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

  return container;
}
