import { useEffect, useRef, useState } from "react";

export const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [pc, setPC] = useState<RTCPeerConnection | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'sender' }));
        };

        return () => {
            ws.close();
        };
    }, []);

    const initiateConn = async () => {
        if (!socket) {
            alert("Socket not connected");
            return;
        }

        const peerConnection = new RTCPeerConnection();
        setPC(peerConnection);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({ type: 'iceCandidate', candidate: event.candidate }));
            }
        };

        peerConnection.onnegotiationneeded = async () => {
            try {
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                socket.send(JSON.stringify({ type: 'createOffer', sdp: peerConnection.localDescription }));
            } catch (error) {
                console.error("Error during negotiation:", error);
            }
        };

        socket.onmessage = async (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'createAnswer' && message.sdp) {
                    if (peerConnection.signalingState !== "stable") {
                        console.warn("PeerConnection is not stable, postponing answer setting");
                        return;
                    }
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
                } else if (message.type === 'iceCandidate' && message.candidate) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
                }
            } catch {
                console.error("Invalid WebSocket message received:", event.data);
            }
        };

        getCameraStreamAndSend(peerConnection);
    };

    const getCameraStreamAndSend = async (peerConnection: RTCPeerConnection) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            stream.getTracks().forEach((track) => {
                console.log("Adding track:", track);
                peerConnection.addTrack(track, stream);
            });
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    return (
        <div>
            <h2>Sender</h2>
            <video ref={videoRef} autoPlay playsInline></video>
            <button onClick={initiateConn}>Start Connection</button>
        </div>
    );
};
