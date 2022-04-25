import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../Context/StateProvider";
import FilterButtons from "./FilterButtons";
import { getAllArtist } from "../api";
import { actionType } from "../Context/reducer";
import { filterByLanguage } from "../utils/supportfunctions";

export const ImageLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  );
};

export const AlertSuccess = ({ msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.6 }}
      className="w-screen z-50 fixed top-0 left-0 flex items-center justify-center"
    >
      <div className="w-460  bg-card rounded-md shadow-md backdrop-blur-md px-4 py-2 flex items-center gap-4">
        <div className="w-[4px] h-10 bg-green-500 rounded-md"></div>
        <BsEmojiSmile className="text-xl text-green-500" />
        <p className="text-base font-semibold text-textColor">
          {msg.length > 50 ? `${msg.slice(0, 50)}...` : msg}
        </p>
      </div>
    </motion.div>
  );
};

export const AlertError = ({ msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.6 }}
      className="w-screen z-50 fixed top-0 left-0 flex items-center justify-center"
    >
      <div className="w-460  bg-card rounded-md shadow-md backdrop-blur-md px-4 py-2 flex items-center gap-4">
        <div className="w-[4px] h-10 bg-red-500 rounded-md"></div>
        <BsEmojiFrown className="text-xl text-red-500" />
        <p className="text-base font-semibold text-textColor">
          {msg.length > 50 ? `${msg.slice(0, 50)}...` : msg}
        </p>
      </div>
    </motion.div>
  );
};

export const ImageUploader = ({
  setImageURL,
  setAlert,
  alertMsg,
  isLoading,
}) => {
  const uploadImage = (e) => {
    isLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setAlert(true);
        alertMsg("Image upload failed.");
        setTimeout(() => {
          setAlert(null);
        }, 4000);
        isLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageURL(downloadUrl);
          isLoading(false);
          setAlert(true);
          alertMsg("Image upladed successfully");
          setTimeout(() => {
            setAlert(null);
          }, 4000);
        });
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg"> click to upload</p>
        </div>
      </div>
      <input
        type="file"
        name="upload-image"
        accept="image/*"
        onChange={uploadImage}
        className="w-0 h-0"
      />
    </label>
  );
};

const DashboardNewSong = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageUrl, setSongImageUrl] = useState(null);
  const [setAlert, setSetAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");

  const [songName, setSongName] = useState("");
  const [audioAsset, setAudioAsset] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [albumName, setAlbumName] = useState(null);

  const [{ artists, artistFilter }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }
  }, []);

  const deleteImageObject = (songURL) => {
    setIsImageLoading(true);
    setSongImageUrl(null);
    const deleteRef = ref(storage, songURL);
    deleteObject(deleteRef).then(() => {
      setSetAlert(true);
      setAlertMsg("Image removed successfully");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
      setIsImageLoading(false);
    });
  };

  return (
    <div className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Type your song name"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />

          <div className="flex w-full justify-between items-center gap-4">
            <FilterButtons filterData={artists} flag={"Artist"} />
            <FilterButtons filterData={filterByLanguage} flag={"Language"} />
          </div>

          <div className="bg-card backdrop-blur-md w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isImageLoading && <ImageLoader />}
            {!songImageUrl ? (
              <ImageUploader
                setImageURL={setSongImageUrl}
                setAlert={setSetAlert}
                alertMsg={setAlertMsg}
                isLoading={setIsImageLoading}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={songImageUrl}
                  alt="uploaded image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteImageObject(songImageUrl);
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div>2</div>
      </div>
      {setAlert && (
        <>
          {setAlert ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </div>
  );
};

export default DashboardNewSong;
