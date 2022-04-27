import React from "react";
import { BsEmojiFrown } from "react-icons/bs";
import { motion } from "framer-motion";

const AlertError = ({ msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.6 }}
      animate={{ opacity: 1, y: 50, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.6 }}
      className="w-screen z-50 fixed top-0 left-0 flex items-center justify-center"
    >
      <div className="w-460  bg-card rounded-md shadow-md backdrop-blur-md px-4 py-2 flex items-center gap-4">
        <div className="w-[4px] h-10 bg-red-500 rounded-md"></div>
        <BsEmojiFrown className="text-xl text-red-500" />
        <p className="text-base font-semibold text-textColor">
          {msg?.length > 50 ? `${msg?.slice(0, 50)}...` : msg}
        </p>
      </div>
    </motion.div>
  );
};

export default AlertError;
