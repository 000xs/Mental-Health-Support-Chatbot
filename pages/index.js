import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { CiSettings } from "react-icons/ci";
import { BsSend } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setChat([...chat, userMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: input }),
    });
    setInput("")

    const data = await response.json();
    const botMessage = { role: "bot", text: data.response };
    setChat([...chat, userMessage, botMessage]);

    setInput("");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-16 bg-[#DDE6EE] ${inter.className}`}
    >
      <div className="container bg-white rounded-xl justify-center items-center flex flex-col py-2">
        <div className="header flex flex-row items-center justify-between w-[440px] py-2 px-5">
          <li>
            <img src="/P.jpg" alt="" className="w-12 h-12 rounded-full" />
          </li>
          <li>
            <h1 className="font-bold px-2 py-1">Chat</h1>
          </li>
          <li>
            <CiSettings className="w-8 h-8" />
          </li>
        </div>

        <div className="content h-[60vh] scroll relative w-[440px] px-5 py-3">
          {chat.map((message, index) => (
            <div key={index} className={`message ${message.role === "user" ? "text-right" : "text-left"}`}>
              <p className={`px-4 py-2 ${message.role === "user" ? "bg-blue-200" : "bg-gray-200"} rounded-lg inline-block`}>
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <div className="footer flex flex-row items-center justify-between w-[440px] py-2 px-5">
          <li>
            <img src="/u.jpg" alt="" className="w-9 h-9 rounded-full" />
          </li>
          <div className="flex flex-row justify-between w-[350px]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="bg-[#E8EEF2] w-[300px] placeholder:px-1 rounded-md"
            />
            <button
              onClick={sendMessage}
              className="rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center text-white"
            >
              <BsSend className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="py-1 font-semibold text-gray-500 text-sm">End-to-encrypted</p>
      </div>
    </main>
  );
}
