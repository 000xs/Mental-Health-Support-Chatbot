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
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');

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
      className={`flex min-h-screen flex-col items-center justify-between p-4 md:p-16 bg-[#DDE6EE] dark:bg-gray-900 text-black dark:text-white ${inter.className}`}
    >
      <div className="container bg-white dark:bg-gray-800 dark:text-white rounded-xl flex flex-col justify-between items-center w-full max-w-md h-full sm:h-auto absolute py-2">
        {/* Header: Positioned at the top */}
        <div className="header flex flex-row items-center justify-between w-full px-4 py-2 sm:w-[440px]">
          <li
            onClick={() => setProfileOpen(!profileOpen)}>
            <img src="/P.jpg" alt="" className="w-12 h-12 rounded-full" />
          </li>
          <li>
            <h1 className="font-bold px-2 py-1">Chat</h1>
          </li>
          <li>
            <button onClick={() => setSettingsOpen(!settingsOpen)}>
              <CiSettings className="w-8 h-8" />
            </button>
          </li>
        </div>

        {/* Chat Content: Positioned in the middle, taking up available space */}
        <div className="content flex-grow overflow-y-scroll w-full px-4 py-3 sm:h-[60vh] sm:w-[440px]">
          {chat.map((message, index) => (
            <div
              key={index}
              className={`message mb-2 ${message.role === "user" ? "text-right" : "text-left"
                }`}
            >
              <div
                className={`px-4 py-2 ${message.role === "user"
                    ? "bg-blue-200 dark:bg-blue-500"
                    : "bg-gray-200 dark:bg-gray-600"
                  } rounded-lg inline-block`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box: Positioned at the bottom */}
        <div className="footer flex flex-row items-center justify-between w-full px-4 py-2 sm:w-[440px]">
          <li>
            <img src="/u.jpg" alt="" className="w-9 h-9 rounded-full" />
          </li>
          <div className="flex flex-row justify-between w-full ml-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="bg-[#E8EEF2] dark:bg-gray-700 dark:placeholder-gray-300 placeholder-gray-500 flex-grow rounded-md px-2"
            />
            <button
              onClick={sendMessage}
              className="ml-2 rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center text-white"
            >
              <BsSend className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile and Settings Panels */}
        {settingsOpen && (
          <div className="settings-panel absolute top-0 right-0 mt-16 mr-16 w-[300px] p-5 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-lg z-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                className="text-gray-500 dark:text-gray-300"
              >
                X
              </button>
            </div>

            <div className="flex justify-around mb-4">
              <button
                className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'privacy' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
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
                <h3 className="text-xl font-bold mb-4">Privacy Notice</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your messages are end-to-end encrypted. We prioritize your privacy and ensure that nothing is saved or stored. All conversations are private and secure.
                </p>
              </div>
            )}
          </div>
        )}

        {profileOpen && (
          <div className="profile-panel absolute top-0 right-0 mt-16 mr-16 w-[300px] p-5 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-lg z-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Profile</h2>
              <button
                onClick={() => setProfileOpen(false)}
                className="text-gray-500 dark:text-gray-300"
              >
                X
              </button>
            </div>
            <div className="text-center">
              <img src="/P.jpg" alt="" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Chatbot Name</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">This is a mental health chatbot designed to help you with your emotional well-being.</p>
              <p className="text-gray-600 dark:text-gray-400">Status: Online</p>
            </div>
          </div>
        )}

        {/* End-to-End Encryption Text */}
        <p
          className="py-1 font-semibold text-gray-500 dark:text-gray-400 text-sm cursor-pointer"
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
