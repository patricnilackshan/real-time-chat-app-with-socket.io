const socket = io(`${HOST}:${PORT}`);

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
  typingIndicator.style.visibility = "visible";
  typingIndicator.textContent = `${name} is typing...`;

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.style.visibility = "hidden"; // Hide after a delay
  }, 1000);
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
  } else if (type === "system") {
    messageElement.classList.add("system");
  }
  messageElement.innerText = message;
  messageContainer.append(messageElement);

  // Scroll to bottom of the container
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
