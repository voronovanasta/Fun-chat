import "./index.css";
import Router from "./Router";

const root = document.createElement("div");
root.id = "root";
document.body.append(root);
console.log(root);
const router = new Router(root);
router.init();
