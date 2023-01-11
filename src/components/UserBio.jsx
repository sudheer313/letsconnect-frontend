import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLEUSER } from "../utils/queries";

const UserBio = ({ userId }) => {
  const { loading, error, data } = useQuery(QUERY_SINGLEUSER, {
    variables: { userId },
    fetchPolicy: "nocache",
  });
  const userInfo = data?.getUser || {};

  if (error) {
    console.log("error request", error);
  }

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div> Request is loading </div>
      ) : (
        <>
          <img
            src={`https://robohash.org/${userInfo?._id}`}
            alt="roboimgs"
            className="h-28 w-28 p-1 rounded-full bg-slate-400"
          />
          <h2 className="py-2">{userInfo?.username}</h2>
          <p className="pb-2 text-slate-500">Bio of the user</p>
          <div className="flex gap-12">
            <p>Posts {userInfo?.postsCount}</p>
            <p>Followers {userInfo?.followers}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBio;
