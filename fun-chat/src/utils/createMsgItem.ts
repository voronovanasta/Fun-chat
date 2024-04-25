import Message from "../types/Message";

export default function createMsgItem(
  message: Message,
  align: "right" | "left",
) {
  const msgContainer = document.createElement("div");
  msgContainer.className = "msg-wrapper";
  const messageContent = document.createElement("div");
  messageContent.style.float = align;
  messageContent.className = "msg-content";
  const dateEl = document.createElement("p");
  const date = new Date(message.datetime);
  dateEl.textContent = date.toString();
  const text = document.createElement("p");
  text.className = "text";
  text.textContent = message.text;
  const statusItem = document.createElement("p");
  statusItem.id = "delivery-status";
  text.dataset.id = message.id;
  const editState = document.createElement("p");
  const sender = document.createElement("p");

  if (align === "right") {
    sender.textContent = "You";
    statusItem.dataset.sender = "you";
    if (message.status.isDelivered) {
      statusItem.textContent = "delivered";
    } else {
      statusItem.textContent = "not delivered";
    }

    if (message.status.isReaded) {
      statusItem.textContent = "read";
    }

    if (message.status.isEdited) {
      editState.textContent = "edited";
    }
  } else {
    sender.textContent = message.from;
  }

  messageContent.append(sender, dateEl, text, editState, statusItem);
  msgContainer.append(messageContent);
  return msgContainer;
}
