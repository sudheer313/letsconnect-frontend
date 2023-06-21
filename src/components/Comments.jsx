import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../utils/queries";

function Comments({ postId }) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { postId },
  });

  if (loading) return <p>Loading comments...</p>;
  if (error) return; //<p>Error loading comments: {error.message}</p>; // Display the error message

  const comments = data?.comments || [];

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.description}</p>
          <p>Author: {comment.author.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
