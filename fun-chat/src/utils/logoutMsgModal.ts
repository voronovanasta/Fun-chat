const LogoutMsgModal = {
  createMessage: () => {
    const overlay = document.createElement("div");
    const resultModal = document.createElement("button");
    const yesBtn = document.createElement("button");
    const noBtn = document.createElement("button");
    const message = document.createElement("p");
    message.id = "message";
    message.textContent =
      "Are you sure to leave the game? The progress will be lost.";
    yesBtn.id = "yes";
    yesBtn.textContent = "Ok!";
    yesBtn.className = "button";
    noBtn.id = "no";
    noBtn.textContent = "No!";
    noBtn.className = "button";
    overlay.className = "modal-overlay";
    resultModal.className = "result-modal";
    resultModal.append(message, yesBtn, noBtn);
    document.body.append(overlay, resultModal);
  },

  hideMessage: () => {
    document.querySelector(".modal-overlay")?.classList.add("modal-closed");
    document.querySelector(".result-modal ")?.classList.add("modal-closed");
  },
};

export default LogoutMsgModal;
