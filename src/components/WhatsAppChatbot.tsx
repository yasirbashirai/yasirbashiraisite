import { useState } from "react";
import { X, Send } from "lucide-react";

const quickReplies = [
  "I need AI automation",
  "I want a free audit",
  "Tell me about pricing",
  "I need a web app built",
];

// Inline WhatsApp brand glyph (Lucide does not ship brand icons)
const WhatsAppIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.93 2.722.93.34 0 1.46-.142 1.706-.546.246-.4.343-.748.343-1.087 0-.144 0-.4-.243-.5-.13-.04-2.5-.957-2.5-.957zM16.176 4.075c-6.93 0-12.55 5.62-12.55 12.55 0 2.288.62 4.534 1.794 6.5L2.5 30l7.06-2.853c1.929 1.078 4.092 1.643 6.317 1.643 6.93 0 12.55-5.62 12.55-12.55s-5.62-12.55-12.55-12.55zm0 22.929c-2.058 0-4.072-.55-5.832-1.594l-.418-.247-4.336 1.74 1.766-4.246-.273-.43A10.376 10.376 0 0 1 5.4 16.625c0-5.945 4.83-10.776 10.776-10.776 5.945 0 10.776 4.83 10.776 10.776s-4.83 10.78-10.776 10.78z" />
  </svg>
);

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
              <p className="mt-1">I'm Yasir, AI Automation Engineer. How can I help you today?</p>
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

      {/* FAB Button, bigger, WhatsApp glyph */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X size={30} /> : <WhatsAppIcon size={36} />}
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
