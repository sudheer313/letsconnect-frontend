import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const FindUser = ({ randomUser }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={`https://robohash.org/${randomUser?._id}`}
          alt="roboimgs"
          className="h-10 w-10 p-1 rounded-full bg-slate-400"
        />
        <h2>{randomUser?.username}</h2>
      </div>
      <HiOutlineSearch className="h-6 w-6 md:mx-2" />
    </div>
  );
};

export default FindUser;
