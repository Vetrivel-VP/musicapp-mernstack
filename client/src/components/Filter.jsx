import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";

const Filter = () => {
  const [{ filterTerm, artists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };
  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-evenly">
      <FilterButtons filterData={artists} flag={"Artist"} />

      <div className=" flex items-center gap-6 mx-4">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div>

      <FilterButtons filterData={filterByLanguage} flag={"Language"} />
    </div>
  );
};

export default Filter;
