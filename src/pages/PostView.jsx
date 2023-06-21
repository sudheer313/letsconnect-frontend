import React from "react";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import TrendingPostList from "../components/TrendingPostList";
import { Link, useLocation } from "react-router-dom";
import Post from "../components/Post";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments"; // Import the Comments component
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLEPOST } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";

const PostView = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { loading, error, data } = useQuery(QUERY_SINGLEPOST, {
    variables: { postId },
    fetchPolicy: "cache-and-network",
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      {
        query: QUERY_SINGLEPOST,
        variables: { postId },
      },
    ],
  });

  if (loading) {
    console.log("Request loading");
  }
  if (error) {
    console.log("error request");
  }
  const postInfo = data?.getPost || {};

  const handleAddComment = async (description) => {
    try {
      await addComment({
        variables: { postId, description },
      });
    } catch (err) {
      console.error("Error occurred while adding the comment:", err);
    }
  };

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
          <CommentForm handleAddComment={handleAddComment} />
          <Comments postId={postId} /> {/* Render the Comments component */}
        </div>
        <TrendingPostList />
      </div>
    </div>
  );
};

export default PostView;
