# Vaanga Pesalaam - Real-Time Chat Application

**Vaanga Pesalaam** is a simple real-time chat application built using Node.js, Express, and Socket.IO. It allows users to send and receive messages in real-time, with notifications for new connections, disconnections, and typing indicators.

## Features

- Real-time chat messages between users.
- Notifications for when users connect or disconnect.
- Typing indicator when someone is typing a message.
- Simple, clean user interface.

## Tech Stack

- **Backend:** Node.js, Express, Socket.IO
- **Frontend:** HTML, CSS, JavaScript
- **Server:** HTTP server running on port 5000

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/patricnilackshan/real-time-chat-app-with-socket.io.git
   cd real-time-chat-app-with-socket.io
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

The application will start on http://localhost:5000.

## How It Works

### Server `(server.js)`

- The server is built using Node.js and Express.
- It uses Socket.IO to enable real-time communication.
- When a user connects, a unique socket ID is assigned, and their name is broadcasted to other users.
- The server listens for messages and typing events, and broadcasts them to other connected users.

### Client `(index.html, script.js)`

- The frontend consists of a basic HTML structure with a real-time message display.
- Users can input their name and start chatting.
- When a user types, a typing indicator appears for other users.
- Messages are sent using WebSockets, and the chat updates in real-time.

## How to Use

- Open the application in your browser at http://localhost:5000.
- Enter your name when prompted.
- Start typing messages and sending them. You'll see your messages appear in the chat window.
- As other users join or leave, you'll see notifications for their actions.
- If someone is typing, you'll see a "X is typing..." message.
