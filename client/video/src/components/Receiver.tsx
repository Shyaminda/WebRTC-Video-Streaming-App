import { useEffect, useRef } from "react";

export const Receiver = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'receiver' }));
        };

        startReceiving(socket);

        return () => {
            socket.close();
        };
    }, []);

    function startReceiving(socket: WebSocket) {
        const pc = new RTCPeerConnection();

        pc.ontrack = (event) => {
            console.log("Received track event:", event);
            if (videoRef.current) {
                const stream = videoRef.current.srcObject instanceof MediaStream
                    ? videoRef.current.srcObject
                    : new MediaStream();
                stream.addTrack(event.track);
                videoRef.current.srcObject = stream;
                console.log("Stream assigned to video element:", stream.getTracks());
            }
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'createOffer') {
                    pc.setRemoteDescription(new RTCSessionDescription(message.sdp))
                        .then(() => pc.createAnswer())
                        .then((answer) => {
                            pc.setLocalDescription(answer);
                            socket.send(JSON.stringify({ type: 'createAnswer', sdp: answer }));
                        })
                        .catch(console.error);
                } else if (message.type === 'iceCandidate' && message.candidate) {
                    pc.addIceCandidate(new RTCIceCandidate(message.candidate)).catch(console.error);
                }
            } catch {
                console.error("Invalid WebSocket message received:", event.data);
            }
        };
    }

    return (
        <div>
            <h2>Receiver</h2>
            <video ref={videoRef} autoPlay playsInline></video>
        </div>
    );
};