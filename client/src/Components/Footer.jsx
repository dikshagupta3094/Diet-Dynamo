import React from "react";
import { FaTwitter,FaInstagram,FaWhatsapp,FaYoutube  } from "react-icons/fa6";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex  flex-col sm:flex-row justify-between items-center shadow-2xl px-10">
      <div className="text-[18px] sm:text-lg font-semibold py-2 space-y-3">All Rights Reserved © Diet Dynamo | {year}</div>
      <div className="flex flex-row gap-5">
      <a className="hover:text-green-500 transition-all ease-in-out duration-300 cursor-pointer hover:translate-x-1">
          <FaInstagram size={30} />
        </a>
        <a className="hover:text-green-500 transition-all ease-in-out duration-300 cursor-pointer hover:translate-x-1">
          <FaTwitter size={30}/>
        </a>
        <a className="hover:text-green-500 transition-all ease-in-out duration-300 cursor-pointer hover:translate-x-1">
          <FaWhatsapp size={30}/>
        </a>
        <a className="hover:text-green-500 transition-all ease-in-out duration-300 cursor-pointer hover:translate-x-1">
          <FaYoutube size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
