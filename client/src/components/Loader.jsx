import React from "react";

const Loader = () => {
  return (
    <div className="flex z-50 w-full h-screen justify-center items-center space-x-2 bg-loaderOverlay">
      <div className="text-center">
        <div className="w-40 h-40 min-w-[160px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
