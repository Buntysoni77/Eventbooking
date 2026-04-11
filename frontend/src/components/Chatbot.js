import { useState, useEffect, useRef } from "react";
import API from "../services/api";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  //load chat his..
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  //save chat his..
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  //auto-scrol
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //send msg
  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { text, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      // Calling Backend (Groq Llama 3.1 + RAG)
      const res = await API.get(`/ai/chat?query=${encodeURIComponent(text)}`);

      setMessages((prev) => [
        ...prev,
        { text: res.data, sender: "ai" }
      ]);
    } catch (err) {
      console.log("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { text: " AI is temporarily unavailable.", sender: "ai" }
      ]);
    }
  };

  //voice input
  const startVoice = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
      sendMessage(speechText);
    };

    recognition.start();
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform z-50"
        >
          💬
        </div>
      )}

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-5 right-5 w-[320px] bg-white shadow-2xl rounded-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
          
          {/* HEADER */}
          <div className="bg-blue-600 text-white p-4 text-sm flex justify-between items-center font-bold">
            <span>✨ Event AI Assistant</span>
            <button onClick={() => setOpen(false)} className="hover:text-gray-300">✖</button>
          </div>

          {/* BODY */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-3 text-sm bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 max-w-[80%] rounded-2xl shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto rounded-tr-none"
                    : "bg-white text-gray-800 mr-auto rounded-tl-none border border-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* Invisible div to anchor the scroll */}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm"
              placeholder="Type a message..."
            />
            
            <button onClick={startVoice} className="text-gray-500 hover:text-blue-600 transition">
              🎤
            </button>

            <button
              onClick={() => sendMessage()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
