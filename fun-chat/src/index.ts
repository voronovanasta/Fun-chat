import "./index.css";
import Router from "./Router";
import Socket from "./SocketClass";

const root = document.createElement("div");
const socket = new Socket("ws://127.0.0.1:4000");
console.log(`socket created: ${socket}`);
root.id = "root";
document.body.append(root);
const router = new Router(root, socket);
router.init();
