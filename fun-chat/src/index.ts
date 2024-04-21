import "./index.css";
import Router from "./Router";

const root = document.createElement("div");
const socket = new WebSocket("ws://127.0.0.1:4000");
root.id = "root";
document.body.append(root);
const router = new Router(root, socket);
router.init();
