import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashBoardHome = () => {
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}
      <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={2500} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={2500} />

      {/* prettier-ignore */}
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={2500} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={2500} />
    </div>
  );
};

export default DashBoardHome;
