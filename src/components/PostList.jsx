import React from "react";
import Post from "../components/Post";
import { useQuery } from "@apollo/client";
import { QUERY_ALLPOSTS } from "../utils/queries";
import { Link } from "react-router-dom";

const PostList = ({ postBySearch }) => {
  const { loading, error, data } = useQuery(
    QUERY_ALLPOSTS,

    {
      fetchPolicy: "no-cache",
    }
  );

  const allPosts = data?.getAllPosts || []; //data.getAllPosts

  if (error) {
    console.log("error request", error);
  }
  return (
    <div className="">
      {loading ? (
        <div> Request is loading </div>
      ) : (
        <>
          {allPosts.map((post) => (
            <Link to={`/posts/${post?._id}`} key={post._id}>
              <Post  post={post} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
