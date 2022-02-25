import { io } from "socket.io-client";

const socket = io("http://localhost:7878");

socket.on("connect", () => {
  console.log("connected to a client", socket.id);
  //   setInterval(() => {
  //     socket.emit("custom-event", 10, "Test Event", { key: "val" });
  //   }, 3000);

  //   setInterval(() => {
  //     socket.emit("send-message", 10, "Test Message", { key: "val" });
  //   }, 3000);
  setTimeout(() => {
    socket.emit("join-room", "test");
  }, 1000);

  setInterval(() => {
    socket.emit("room-message", "Test Message", "test");
  }, 3000);
});

socket.on("received-message", (message) => {
  console.log("message", message);
});
