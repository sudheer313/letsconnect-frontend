import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { QUERY_POSTBYSEARCH } from "../utils/queries";
import Post from "./Post";

const PostsBySearch = ({ searchQuery }) => {
  const { loading, error, data } = useQuery(QUERY_POSTBYSEARCH, {
    variables: { searchQuery },
    fetchPolicy: "no-cache",
  });

  const postsBySearch = data?.getPostBySearch || [];

  if (error) {
    console.log("error request", error);
  }
  return (
    <div className="">
      <div className="flex flex-col items-center pt-4">
        <h1 className="text-2xl">Showing results for "{searchQuery}"</h1>
        <p className="text-xl">{postsBySearch.length} results found</p>
      </div>
      {loading ? (
        <div> Request is loading </div>
      ) : (
        <>
          {postsBySearch.map((post) => (
            <Link to={`/posts/${post?._id}`} key={post._id}>
              <Post post={post} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default PostsBySearch;
