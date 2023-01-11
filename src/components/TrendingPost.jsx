import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";

const TrendingPost = ({ trendPost }) => {
  return (
    <div className="flex flex-col gap-4 border p-4 my-3 rounded-md cursor-pointer">
      <div className="flex items-center gap-4">
        <img
          src={`https://robohash.org/${trendPost?.authorId}`}
          alt="roboimgs"
          className="h-10 w-10 p-1 rounded-full cursor-pointer bg-slate-400"
        />
        <h2>{trendPost.author.username}</h2>
      </div>
      <h1 className="my-2">🎉 {trendPost?.title} 🎉</h1>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AiOutlineHeart className="text-2xl" />
          <span>{trendPost?.likes.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <AiOutlineComment className="text-2xl" />
          <span>{trendPost?.commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingPost;
