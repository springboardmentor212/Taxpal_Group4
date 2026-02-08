import { createContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
export const MyContext = createContext(null);
export default function MyContextProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  return (
    <MyContext.Provider value={{
        prompt,setPrompt,
        messages,setMessages,
        currThreadId,setCurrThreadId,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}