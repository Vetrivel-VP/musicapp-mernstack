import React from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";

const MusicPlayer = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  return (
    <div className="w-full full flex items-center gap-3">
      <img
        src={song?.imageURL}
        className="w-40 h-20 object-cover rounded-md"
        alt=""
      />
      <div className="flex items-start flex-col">
        <p className="text-xl text-headingColor font-semibold">
          {`${song?.name.length > 20 ? song?.name.slice(0, 20) : song?.name}`}{" "}
          <span className="text-base">({song?.album})</span>
        </p>
        <p className="text-textColor">
          {song?.artist}{" "}
          <span className="text-sm text-textColor font-semibold">
            ({song?.category})
          </span>
        </p>
      </div>
      <div className="flex-1">
        <AudioPlayer
          src={song?.songUrl}
          onPlay={() => console.log("is playing")}
          autoPlay={true}
          showSkipControls={true}
        />
      </div>
      <div className="h-full flex items-center justify-center flex-col gap-3">
        <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
          <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
        </motion.i>
        <motion.i whileTap={{ scale: 0.8 }}>
          <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
        </motion.i>
      </div>
    </div>
  );
};

export default MusicPlayer;
