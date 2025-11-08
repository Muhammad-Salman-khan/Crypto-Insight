import Logo from "../assets/logo.svg";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <>
      <div className="max-w-full  bg-gray-950 border-b border-gray-800 flex justify-around align-middle items-center">
        <div className="flex justify-center align-middle items-center p-4">
          {/* Left: Logo and brand */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Crypto Insight Logo"
              className="w-9 h-9 rounded-full object-cover"
            />
            <Link to="/">
              <h1 className="text-white font-semibold text-lg tracking-tight">
                Crypto Insight
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Link to="/about">
              <button
                className="bg-white text-purple-700 p-2 text-[15px] rounded-lg font-semibold 
            hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 
            dark:hover:bg-gray-600 transition"
              >
                About
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
