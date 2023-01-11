import React from "react";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import TrendingPostList from "../components/TrendingPostList";
import PostsBySearch from "../components/PostsBySearch";

const Search = () => {
  const [search] = useSearchParams();
  const searchString = search.get("search") || "";

  return (
    <div className="md:container md:mx-auto md:px-40">
      <Navbar />
      <div className="flex flex-row gap-2">
        <div className="mx-4 md:mx-0 md:basis-3/4">
          <div className="flex items-center gap-4 border p-4 rounded-md">
            <Link to="/posts/create">
              <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
                <MdAdd className="text-xl" />
                <h1>NEW POST</h1>
              </div>
            </Link>
          </div>

          <PostsBySearch searchQuery={searchString} />
        </div>
        <TrendingPostList />
      </div>
    </div>
  );
};

export default Search;
