import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const quickReplies = [
  "I need AI automation",
  "I want a free audit",
  "Tell me about pricing",
  "I need a web app built",
];

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = (text: string) => {
    const msg = encodeURIComponent(text || message);
    window.open(`https://wa.me/923446012505?text=${msg}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="whatsapp-fab">
      {/* Chat Window */}
      {isOpen && (
        <div className="whatsapp-chat">
          <div className="whatsapp-chat-header">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🤖
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Yasir Bashir</p>
              <p className="text-xs text-white/70">Usually replies within 1 hour</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div className="whatsapp-chat-body">
            <div className="whatsapp-bubble mb-3">
              <p>Hey there! 👋</p>
              <p className="mt-1">I'm Yasir — AI Automation Engineer. How can I help you today?</p>
              <p className="text-[10px] text-gray-400 mt-1 text-right">Just now</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="bg-white rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="whatsapp-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && message && sendMessage(message)}
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-800 outline-none border border-gray-200"
            />
            <button
              onClick={() => message && sendMessage(message)}
              className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center cursor-pointer hover:bg-[#20BD5A] transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
