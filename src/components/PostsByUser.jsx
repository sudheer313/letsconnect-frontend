import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import { QUERY_POSTBYUSER } from "../utils/queries";
import Post from "./Post";

const PostsByUser = ({ userId }) => {
  const { loading, error, data } = useQuery(QUERY_POSTBYUSER, {
    variables: { userId },
    fetchPolicy: "no-cache",
  });

  const getPostsByUser = data?.getPostsByUser || [];

  if (error) {
    console.log("error request", error);
  }
  return (
    <div className="">
      {loading ? (
        <div> Request is loading </div>
      ) : (
        <>
          {getPostsByUser.map((post) => (
            <Link to={`/posts/${post?._id}`} key={post._id}>
              <Post post={post} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default PostsByUser;
