import React, { useState } from "react";

function CommentForm({ handleAddComment }) {
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting comment");

    try {
      await handleAddComment(description);
      setDescription("");
    } catch (err) {
      console.error("Error occurred while adding the comment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your comment here..."
        required
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Submit Comment
      </button>
    </form>
  );
}

export default CommentForm;
