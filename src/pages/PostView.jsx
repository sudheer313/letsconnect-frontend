import React from "react";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import TrendingPostList from "../components/TrendingPostList";

import { Link, useLocation } from "react-router-dom";
import Post from "../components/Post";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLEPOST } from "../utils/queries";

const PostView = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { loading, error, data } = useQuery(QUERY_SINGLEPOST, {
    variables: { postId },
    fetchPolicy: "nocache",
  });

  if (loading) {
    console.log("Request loading");
  }
  if (error) {
    console.log("error request");
  }
  const postInfo = data?.getPost || {};

  return (
    <div className="md:container md:mx-auto md:px-40">
      <Navbar />
      <div className="flex flex-row gap-2">
        <div className="mx-4 md:basis-3/4">
          <div className="flex items-center gap-4 border p-4 rounded-md">
            <Link to="/posts/create">
              <div className="flex items-center gap-2 border p-2 rounded-md">
                <MdAdd className="text-xl" />
                <h1>NEW POST</h1>
              </div>
            </Link>
          </div>
          <Post post={postInfo} />
        </div>
        <TrendingPostList />
      </div>
    </div>
  );
};

export default PostView;
