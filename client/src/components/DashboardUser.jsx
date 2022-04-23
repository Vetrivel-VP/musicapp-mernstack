import React, { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";

const DashboardUser = () => {
  const [usersFilter, setUsersFilter] = useState(null);
  const [emailFilter, setEmailFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="w-full p-4 flex items-center justify-center">
      <div className="w-full flex justify-center items-center gap-24">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className={`border ${
            usersFilter === "admin" ? "border-gray-500" : "border-gray-300"
          } rounded-md px-4 py-2 hover:border-gray-500 hover:shadow-md cursor-pointer  `}
        >
          Admin
        </motion.div>

        <input
          type="text"
          placeholder="Search here"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        <motion.div
          whileTap={{ scale: 0.75 }}
          className={`border ${
            usersFilter === "admin" ? "border-gray-500" : "border-gray-300"
          } rounded-md px-4 py-2 hover:border-gray-500 hover:shadow-md cursor-pointer `}
        >
          Member
        </motion.div>

        {(usersFilter || emailFilter) && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
