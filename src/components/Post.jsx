import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, loggedIn } from "../utils/auth";
import { DELETE_POST } from "../utils/mutations";

const Post = ({ post }) => {
  const [deletePost, { error, loading }] = useMutation(DELETE_POST);
  const navigate = useNavigate();
  const [decodedUserInfo, setDecodedUserInfo] = useState({});

  const handlePostDeletion = async (e) => {
    const { data } = await deletePost({
      variables: { postId: post?._id },
    });
    console.log(data);
    navigate("/");
    if (loading) {
      console.log("Request loading");
    }
    if (error) {
      console.log("error request");
    }
  };
  useEffect(() => {
    if (loggedIn()) {
      const { data } = getProfile();
      setDecodedUserInfo(data);
    }
  }, []);

  return (
    <Link to={`/posts/${post?._id}`}>
      <div className="flex flex-row border my-4 cursor-pointer">
        <div className="basis-1/12 bg-slate-200 p-2">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col items-center gap-2">
              <AiOutlineHeart className="text-2xl" />
              <span>{post?.likes?.length}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AiOutlineComment className="text-2xl" />
              <span>{post?.commentsCount}</span>
            </div>
          </div>
        </div>
        <div className="basis-11/12 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={`https://robohash.org/${post?.authorId}`}
                alt="roboimgs"
                className="h-10 w-10 p-1 rounded-full cursor-pointer bg-slate-400"
              />
              <Link to={`/users/${post?.authorId}`}>
                <h2 className="hover:underline">{post?.author?.username}</h2>
              </Link>
            </div>

            <div
              onClick={handlePostDeletion}
              className={`${
                post?.authorId === decodedUserInfo?._id ? "flex" : "hidden"
              }`}
            >
              <AiOutlineDelete className="text-2xl" />
            </div>
          </div>
          <div className="py-4">🎉 {post?.title} 🎉</div>
          <div>{post?.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
