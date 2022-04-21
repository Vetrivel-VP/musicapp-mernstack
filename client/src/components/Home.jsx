import React from "react";
import { useStateValue } from "../Context/StateProvider";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Home = () => {
  const [{ searchTerm }, dispatch] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-8 text-base text-textColor">
          Searched for :{" "}
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}
    </div>
  );
};

export default Home;
