import checkedQuerySelector from "../types/checkedQuerySelector";
import logoutMsgModal from "./logoutMsgModal";

export default function logoutHandler() {
  const currentPath = window.location.pathname;
  const logoutBtn = checkedQuerySelector(document, "#logoutBtn");
  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target === null) throw new Error("target equals null");
    logoutMsgModal.createMessage();
    document.querySelector("#yes")?.addEventListener("click", (event) => {
      if (event.target === null) throw new Error("target equals null");
      localStorage.clear();
      logoutMsgModal.hideMessage();
      window.location.href = logoutBtn?.getAttribute("href") as string;
    });

    document.querySelector("#no")?.addEventListener("click", (event) => {
      if (event.target === null) throw new Error("target equals null");
      console.log(`Path: ${currentPath}`);
      logoutMsgModal.hideMessage();
      window.location.assign(currentPath);
    });
  });
}
