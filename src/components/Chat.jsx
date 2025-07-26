import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import createSocketConnection from "../utils/socket";
import { BASE_URL } from "../utils/contants";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!targetUserId) return;
      try {
        const userRes = await axios.get(
          `${BASE_URL}/get-user-by-id/${targetUserId}`,
          { withCredentials: true }
        );
        setTargetUser(userRes.data.data);

        const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });
        const chatMessages = chat?.data?.messages.map((msg) => ({
          senderId: msg.senderId?._id || msg.senderId,
          text: msg.text,
        }));
        setMessages(chatMessages || []);
      } catch (error) {
        console.error("Failed to fetch initial chat data:", error);
      }
    };
    fetchInitialData();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ senderId, text }) => {
      if (senderId !== userId) {
        setMessages((prev) => [...prev, { senderId, text }]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!socketRef.current || newMessage.trim() === "") return;

    // Send the message to the server
    socketRef.current.emit("sendMessage", {
      senderId: userId,
      targetUserId: targetUserId,
      text: newMessage,
    });

    setMessages((prev) => [...prev, { senderId: userId, text: newMessage }]);
    setNewMessage("");
  };

  if (!targetUser) {
    return (
      <div className="text-center p-8 text-slate-600">Loading Chat...</div>
    );
  }

  return (
    <div className="flex flex-col h-[75vh] w-full max-w-3xl mx-auto bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
      <header className="flex items-center gap-4 p-4 border-b border-slate-900/10 shrink-0">
        <Link to={`/users/${targetUser._id}`}>
          <img
            src={targetUser.photoUrl || "/default-avatar.png"}
            alt={targetUser.firstName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <div>
          <h2 className="font-bold text-lg text-slate-900">
            {targetUser.firstName} {targetUser.lastName}
          </h2>
          <p className="text-sm text-slate-600">Online</p>
        </div>
      </header>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              userId === msg.senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                userId === msg.senderId
                  ? "chat-bubble-outgoing"
                  : "chat-bubble-incoming"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t border-slate-900/10 shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input-form-light w-full"
          />
          <button
            type="submit"
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-all transform hover:scale-110"
          >
            <HiOutlinePaperAirplane size={24} className="-rotate-45" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
