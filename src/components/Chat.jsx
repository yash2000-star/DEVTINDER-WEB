import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import createSocketConnection from "../utils/socket";
import { BASE_URL } from "../utils/contants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        senderId: senderId?._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ senderId, firstName, lastName, text }) => {
      setMessages((prev) => [
        ...prev,
        { senderId, firstName, lastName, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socketRef.current || newMessage.trim() === "") return;

    socketRef.current.emit("sendMessage", {
      senderId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[80vh] border border-gray-700 rounded-xl flex flex-col bg-gray-900 text-white shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 text-xl font-semibold bg-gray-800">
        Chat with {targetUserId || "Unknown"}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (userId === msg.senderId ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header text-sm text-gray-400 mb-1">
              {`${msg.firstName} ${msg.lastName}`}
              <span className="text-xs opacity-50 ml-2">2h ago</span>
            </div>
            <div className="chat-bubble bg-blue-600 text-white">{msg.text}</div>
            <div className="chat-footer text-xs opacity-50 mt-1">Seen</div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 bg-gray-800 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 rounded px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
