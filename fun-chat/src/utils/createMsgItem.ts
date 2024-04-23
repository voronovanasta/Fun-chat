import Message from "../types/Message";

export default function createMsgItem(message: Message) {
  const msgContainer = document.createElement("div");
  const date = document.createElement("p");
  date.textContent = String(message.datetime);
  const text = document.createElement("p");
  text.textContent = message.text;
  const statusItem = document.createElement("p");
  const editState = document.createElement("p");
  if (message.status.isDelivered) {
    statusItem.textContent = "delivered";
  }

  if (message.status.isReaded) {
    statusItem.textContent = "read";
  }

  if (message.status.isEdited) {
    editState.textContent = "edited";
  }

  msgContainer.append(date, text, editState, statusItem);
  return msgContainer;
}
