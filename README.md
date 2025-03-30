# WebRTC Video Streaming

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 📌 About the Project
This project leverages WebRTC technology to facilitate real-time video streaming between a sender and a receiver. The sender captures video input from their webcam and transmits it via a WebRTC connection to the receiver, who then displays the live video feed in real time.

---

## 📑 Index
- [Features](#-features)
- [Built With](#-built-with)
- [Installation](#-installation)
- [How It Works](#-how-it-works)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🚀 Features
- **Real-time Video Streaming**  
  - Utilizes WebRTC for peer-to-peer video streaming in real time.  
- **Sender & Receiver Functionality**  
  - Captures video from the sender's webcam.  
  - Displays the transmitted video on the receiver's screen.  
- **WebSocket Signaling**  
  - Employs WebSocket for signaling, enabling offer/answer exchanges and ICE candidate negotiation between sender and receiver.

---

## 🛠 Built With
- **Frontend**: React, WebRTC API  
- **Backend**: WebSocket (for signaling)  
- **Video Processing**: WebRTC  

---

## 📦 Installation
### Running Locally
Follow these steps to set up and run the project on your local machine:

#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/webrtc-video-streaming.git
cd webrtc-video-streaming
```

#### 2️⃣ Install Dependencies
```sh
# Backend (API)
cd api
npm install

# Frontend (Client)
cd client/video
npm install
```

#### 3️⃣ Start the Backend
```sh
cd api
npm run dev
```
The backend will be accessible at [http://localhost:8080](http://localhost:8080) 🚀

#### 4️⃣ Start the Frontend
```sh
cd client/video
npm run dev
```
The frontend will be accessible at [http://localhost:5173](http://localhost:5173) 🚀

---

## 🔍 How It Works
### 1️⃣ Initiate the Connection
Open two browser tabs:
- **Tab 1:** Navigate to [http://localhost:5173/sender](http://localhost:5173/sender)
- **Tab 2:** Navigate to [http://localhost:5173/receiver](http://localhost:5173/receiver)

### 2️⃣ Sender Tab
- In the sender tab, select **"Start Connection"** to initiate the WebRTC connection.
- This action activates the webcam and begins video transmission to the receiver.

### 3️⃣ Receiver Tab
- In the receiver tab, the video stream from the sender will automatically display once the connection is successfully established.

### 4️⃣ WebSocket Signaling
- The connection relies on WebSocket signaling, through which the sender and receiver exchange **Session Description Protocol (SDP)** offer/answer messages and **ICE candidates** to establish a peer-to-peer link.

---

## 📌 Roadmap
- Enhance connection handling to improve reliability.
- Implement support for multiple simultaneous receivers.
- Optimize video stream performance for efficiency.

---

## 📝 License
This project is licensed under the **MIT License**, permitting free use and modification.

