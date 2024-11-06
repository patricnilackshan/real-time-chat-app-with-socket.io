const socket = io("http://localhost:${PORT}");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
const typingIndicator = document.getElementById("typing");

let typingTimeout;

// Prompt the user for their name
const username = prompt("What is your name?");
appendMessage("You joined", "user");
socket.emit("new-user", username);

// Handle incoming messages
socket.on("chat-message", (data) => {
  appendMessage(`${data.user}: ${data.message}`, "other");
});

// Handle user connection notifications
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`, "system");
});

// Handle user disconnection notifications
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`, "system");
});

// Handle typing indication
socket.on("typing", (name) => {
  typingIndicator.textContent = `${name} is typing...`;
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.textContent = "";
  }, 3000);
});

// Sending messages
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;
  appendMessage(`${username}: ${message}`, "user");
  socket.emit("send-chat-message", message);

  messageInput.value = "";
});

// Notify server when the user is typing
messageInput.addEventListener("input", () => {
  socket.emit("typing");
});

// Append message to the chat container
function appendMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (type === "user") {
    messageElement.classList.add("user");
  } else if (type === "other") {
    messageElement.classList.add("other");
  }
  messageElement.innerText = message;
  messageContainer.append(messageElement);
  window.scrollTo(0, document.body.scrollHeight);
}
