import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { changingUserRole } from "../api";

const DashboardUserCard = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  const UpdateUserRole = (userId, role) => {
    changingUserRole(userId, role);
  };
  return (
    <div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        {/* prettier-ignore */}
        <img src={data.imageURL} alt="" className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.name}</p>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email}</p>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email_verfied ? 'True' : 'False'}</p>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{createdAt}</p>
      <div className=" w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor"> {data.role}</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="text-[10px]  font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
          onClick={() => setIsUpdateRole(true)}
        >
          {data.role === "admin" ? "Member" : "Admin"}
        </motion.p>
        {isUpdateRole && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 rounded-md p-4 flex items-start flex-col gap-4 bg-white shadow-xl"
          >
            <p className="text-textColor text-sm font-semibold">
              Are you sure do u want to mark the user as{" "}
              <span>{data.role === "admin" ? "Member" : "Admin"}</span> ?
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
                onClick={() =>
                  UpdateUserRole(
                    data.user_id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md"
                onClick={() => setIsUpdateRole(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-card animate-pulse"></div>
      )}
    </div>
  );
};

export default DashboardUserCard;
