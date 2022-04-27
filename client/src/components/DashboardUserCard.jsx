import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { changingUserRole, getAllUsers, removeUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { MdDelete } from "react-icons/md";

const DashboardUserCard = ({ data, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);

  const [{ allUsers, user }, dispatch] = useStateValue();
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  const UpdateUserRole = (userId, role) => {
    setIsLoading(true);
    setIsUpdateRole(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    });
  };

  const deleteuser = (userId) => {
    setIsLoading(true);
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
          onClick={() => deleteuser(data._id)}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}
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
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px]  font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
            onClick={() => setIsUpdateRole(true)}
          >
            {data.role === "admin" ? "Member" : "Admin"}
          </motion.p>
        )}
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
                    data._id,
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
    </motion.div>
  );
};

export default DashboardUserCard;
