import "./TaxPalAI.css";
import { MyContext } from "./MyContext";
import { useContext, useState} from "react";
import { PulseLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
function TaxpalAI() {
  const [loading, setLoading] = useState(false);
  const { prompt, setPrompt, messages, setMessages, currThreadId } =useContext(MyContext);
  const getReply = async () => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    const userPrompt = prompt;
    setPrompt("");
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userPrompt,
          threadId: currThreadId,
        }),
      });
      const res = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: res.reply }]);
    } 
    catch (err) {
      console.error(err);
    } 
    finally {
      setLoading(false);
    }
  };
  return (
    <div className="chatbot-class">
      {messages.length === 0 && (
        <p className="welcome-text">How can I help with?</p>
      )}

      <div className="chat-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user" : "ai"}`}>
            {msg.role === "ai" ? (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {msg.content}
              </ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {loading && (
          <div className="message-ai">
            <PulseLoader size={8} color="#e5e7eb" />
          </div>
        )}
      </div>
      <div className="input-box">
        <input placeholder="Ask anything" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && getReply()}/>
        <button className="send-btn" onClick={getReply} disabled={loading}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
      <p className="note-id">Taxpal AI can make Mistakes. Check Important Info and latest News.</p>
    </div>
  );
}
export default TaxpalAI;