import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPromt } from "../data/chatbot";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MessageSquare, Send, X, Sparkles, Bot } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: any;
}

export default function ChatBot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const { cartId } = useSelector((root: RootState) => root.cart);
  const { user } = useSelector((root: RootState) => root.user);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCO12PlmLawcTlm2vitVPfY_wnjjOFLUEM"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  useEffect(() => {
    // Add welcome message when chat is first opened
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Hello! I'm your SpareLK assistant. How can I help you find auto parts today?",
        },
      ]);
    }

    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    await getAiRespond(userMessage.text);
    setIsTyping(false);
  };

  const getAiRespond = async (input: string) => {
    try {
      const { response } = await model.generateContent(
        getPromt(input, cartId!, user!)
      );
      const botMessage: Message = { sender: "bot", text: response.text() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI response error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I encountered an issue processing your request. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="fixed right-8 bottom-8 z-50 flex flex-col items-end">
      {/* Tooltip */}
      {!chatOpen && (
        <div className="mb-3 bg-white rounded-lg p-3 shadow-lg border border-gray-200 transform transition-all duration-200 ease-in-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none max-w-xs">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-orange-500 mr-2" />
            <p className="text-slate-700 text-sm font-medium">
              Need help finding parts?
            </p>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Click to chat with our AI assistant
          </p>
          <div className="absolute -bottom-2 right-5 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`group flex items-center justify-center rounded-full w-14 h-14 ${
          chatOpen ? "bg-slate-700" : "bg-orange-500 hover:bg-orange-600"
        } text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2`}
      >
        {chatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={`w-[350px] sm:w-[400px] h-[500px] flex flex-col ${
          chatOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } transition-all duration-300 ease-in-out origin-bottom-right absolute right-0 bottom-16 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden`}
      >
        {/* Chat header */}
        <div className="bg-orange-500 text-white py-4 px-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            <h3 className="font-medium text-lg">SpareLK Assistant</h3>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages area */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-gray-50"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 max-w-[85%] rounded-lg ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-gray-200 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-600 border border-gray-200 rounded-lg rounded-tl-none shadow-sm p-3 max-w-[85%]">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-100 shadow-inner">
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className={`px-3 py-2 rounded-r-lg ${
                input.trim()
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-200 cursor-not-allowed"
              } text-white transition-colors duration-200 flex items-center justify-center`}
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Powered by AI - Ask about parts, vehicles, or orders
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {chatOpen && (
        <div
          onClick={() => setChatOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[-1] transition-opacity duration-300"
        ></div>
      )}
    </div>
  );
}
