import React from "react";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../utils/mutations";

const LikeButton = ({ postId }) => {
  const [likePost, { loading, error }] = useMutation(LIKE_POST);

  const handleClick = async () => {
    try {
      const { data } = await likePost({ variables: { postId } });
      console.log("Post liked successfully:", data.likePost._id);
    } catch (err) {
      console.error("Error occurred while liking the post:", err);
    }
  };

  return (
    <div>
      <button disabled={loading} onClick={handleClick}>
        Like Post
      </button>
      {error && <p>Error occurred while liking the post</p>}
    </div>
  );
};

export default LikeButton;
