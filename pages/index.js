import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { CiSettings } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import ReactMarkdown from 'react-markdown';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default to light mode
  const [notifications, setNotifications] = useState(true); // Default to notifications enabled
  const [privacy, setPrivacy] = useState(true); // Default to privacy enabled
  const [activeTab, setActiveTab] = useState('settings'); // State to manage the active tab

  // Toggle dark mode class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const inputText = input;
    setInput("");

    const userMessage = { role: "user", text: input };
    setChat([...chat, userMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: inputText }),
    });

    const data = await response.json();
    const botMessage = { role: "bot", text: data.response };
    setChat([...chat, userMessage, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-16 bg-[#DDE6EE] dark:bg-gray-900 text-black dark:text-white ${inter.className}`}
    >
      <div className="container bg-white dark:bg-gray-800 dark:text-white rounded-xl justify-center items-center absolute flex flex-col py-2 w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="flex flex-col items-center z-10 w-full">
          <div className="header flex flex-row items-center justify-between w-full py-2 px-4 sm:px-5">
            <li>
              <img src="/P.jpg" alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
            </li>
            <li>
              <h1 className="font-bold px-2 py-1 text-lg sm:text-xl">Chat</h1>
            </li>
            <li>
              <button onClick={() => setSettingsOpen(!settingsOpen)}>
                <CiSettings className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </li>
          </div>

          <div className="content h-[50vh] sm:h-[60vh] overflow-y-scroll relative w-full px-4 sm:px-5 py-3">
            {chat.map((message, index) => (
              <div
                key={index}
                className={`message mb-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-2 ${
                    message.role === "user"
                      ? "bg-blue-200 dark:bg-blue-500"
                      : "bg-gray-200 dark:bg-gray-600"
                  } rounded-lg inline-block max-w-full break-words`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <div className="footer flex flex-row items-center justify-between w-full py-2 px-4 sm:px-5">
            <li>
              <img src="/u.jpg" alt="" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full" />
            </li>
            <div className="flex flex-row justify-between w-full max-w-xs sm:max-w-sm md:max-w-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="bg-[#E8EEF2] dark:bg-gray-700 dark:placeholder-gray-300 placeholder-gray-500 w-full sm:w-[300px] rounded-md px-2"
              />
              <button
                onClick={sendMessage}
                className="ml-2 rounded-full bg-blue-500 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white"
              >
                <BsSend className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Settings Interface */}
        {settingsOpen && (
          <div className="settings-panel absolute top-0 right-0 mt-12 mr-4 w-[260px] sm:w-[300px] p-4 sm:p-5 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                className="text-gray-500 dark:text-gray-300"
              >
                X
              </button>
            </div>
            
            <div className="flex justify-around mb-4">
              <button
                className={`px-3 py-2 rounded ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
              <button
                className={`px-3 py-2 rounded ${activeTab === 'privacy' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                onClick={() => setActiveTab('privacy')}
              >
                Privacy
              </button>
            </div>

            {activeTab === 'settings' && (
              <div>
                <div className="mb-4">
                  <label className="text-sm font-medium">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full mt-2 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="text-sm font-medium">Notifications</label>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="ml-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium">Privacy</label>
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={() => setPrivacy(!privacy)}
                    className="ml-2"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Enable privacy mode</span>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Privacy Notice</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                  Your messages are end-to-end encrypted. We prioritize your privacy and ensure that nothing is saved or stored. All conversations are private and secure.
                </p>
              </div>
            )}

          </div>
        )}

        {/* End-to-End Encryption Text */}
        <p
          className="py-1 font-semibold text-gray-500 dark:text-gray-400 text-xs sm:text-sm cursor-pointer"
          onClick={() => {
            setSettingsOpen(true);
            setActiveTab('privacy');
          }}
        >
          End-to-end encrypted
        </p>

      </div>
    </main>
  );
}
