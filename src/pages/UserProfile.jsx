import React from "react";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import PostsByUser from "../components/PostsByUser";
import UserBio from "../components/UserBio";
import FindUser from "../components/FindUser";
import { FiUserPlus } from "react-icons/fi";
import { useQuery } from "@apollo/client";
import { QUERY_RANDOMUSERS } from "../utils/queries";

const UserProfile = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const { loading, error, data } = useQuery(QUERY_RANDOMUSERS, {
    variables: { userId },
    fetchPolicy: "nocache",
  });
  const randomUsers = data?.getRandomUsers || [];

  if (error) {
    console.log("error request", error);
  }

  return (
    <div className="md:container md:mx-auto md:px-40">
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row gap-2">
        <div className="mx-4 md:mx-0 md:basis-3/4">
          <div className="flex items-center gap-4 border p-4 rounded-md">
            <Link to="/posts/create">
              <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
                <MdAdd className="text-xl" />
                <h1>NEW POST</h1>
              </div>
            </Link>
          </div>
          <PostsByUser userId ={userId} />
        </div>
        <div className="mx-4 md:mx-0 md:flex-col md:basis-1/4">
          <div className="flex items-center gap-4 border p-4 rounded-md">
            <UserBio userId={userId} />
          </div>
          <div className="hidden md:flex items-center justify-center gap-4 border p-4 my-2 rounded-md">
            <FiUserPlus className="text-xl" />
            <h1>Find Others</h1>
          </div>
          <div className="hidden md:flex flex-col gap-4 border p-4 rounded-md cursor-pointer">
            {loading ? (
              <div> Request is loading </div>
            ) : (
              <>
                {randomUsers.map((randomUser) => (
                  <FindUser key={randomUser._id} randomUser={randomUser} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
