import Image from "next/image";
import { Inter } from "next/font/google";
import { CiSettings } from "react-icons/ci";
import { BsSend } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-16 bg-[#DDE6EE] ${inter.className}`}
    >
      <div className="containr bg-white rounded-xl justify-center items-center flex flex-col py-2">
        <div className="hedaer flex flex-row items-center justify-between w-[440px] py-2 px-5">
          <li><img src="/P.jpg" alt="" srcset="" className="w-12 h-12 rounded-full" /></li>
          <li><h1 className="font-bold px-2 py-1">Chat</h1></li>
          <li><CiSettings className="w-8 h-8" /></li>
        </div>

        <div className="content h-[60vh] scroll relative">

        </div>

        <div className="footer  flex flex-row items-center justify-between   w-[440px] py-2 px-5">
          <li><img src="/u.jpg" alt="" srcset="" className="w-9 h-9 rounded-full" /></li>

          <div className="flex flex-row justify-between w-[350px] ">
            <input type="text" placeholder=" type a message.." className="bg-[#E8EEF2] w-[300px] placeholder:px-1 rounded-md" />
            <button className="rounded-full bg-blue-500 w-10 h-10 flex items-center align-middle justify-center  text-white"><BsSend className="w-5 h-5" /></button>
          </div>
          


        </div>
        <p className="py-1 font-semibold text-gray-500 text-sm">End-to-encryptaed</p>

      </div>
    </main>
  );
}
