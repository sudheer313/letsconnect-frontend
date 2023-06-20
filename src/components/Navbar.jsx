import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn, logout } from "../utils/auth";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const Navbar = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
    toast.success("LogOut Successfull");
    navigate("/login");
  };

  return (
    <>
      <nav className="grid grid-cols-2 md:grid-cols-3 p-5 md:px-0">
        <div className="flex items-center md:text-2xl ">
          <Link to="/">
            <h1 className="text-slate-500 font-bold">Lets Connect</h1>
          </Link>
        </div>
        <form
          className="md:flex items-center md:border-2 rounded-full py-2 md:shadow-sm hidden"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search Post"
            className="flex-grow pl-4 bg-transparent outline-none text-sm text-gray-600"
            value={search}
            onChange={handleChange}
          />
          <button type="submit">
            <HiOutlineSearch className="h-7 w-7 p-1 bg-slate-500 text-white rounded-full cursor-pointer md:mx-2" />
          </button>
        </form>
        <div className="flex items-center justify-end gap-4 text-slate-500">
          <HiOutlineSearch
            className="h-7 w-7 p-1 cursor-pointer md:hidden"
            onClick={() => setToggleSearch((prev) => !prev)}
          />
          {loggedIn() ? (
            <>
              <div className="cursor-pointer">{loggedInUser?.username} </div>
              <div className="cursor-pointer" onClick={handleLogout}>
                {" "}
                LOGOUT{" "}
              </div>
            </>
          ) : (
            <>
              <Link to="/signup">SIGN UP</Link>
              <Link to="/login">LOGIN</Link>
            </>
          )}
        </div>
      </nav>
      <form
        className={`items-center border-2 rounded-full p-2 m-2 ${
          toggleSearch ? "flex md:hidden" : "hidden"
        }`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search Post"
          className="flex-grow pl-4 bg-transparent outline-none text-sm text-gray-600"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">
          <HiOutlineSearch className="h-7 w-7 p-1 bg-slate-500 text-white rounded-full cursor-pointer md:mx-2" />
        </button>
      </form>
    </>
  );
};

export default Navbar;
