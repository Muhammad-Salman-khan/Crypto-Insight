import Logo from "../assets/logo.svg";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = () => {
  return (
    <>
      <div className="w-full bg-gray-950 border-b border-gray-800 flex ">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 py-3">
          {/* Left: Logo and brand */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Crypto Insight Logo"
              className="w-9 h-9 rounded-full object-cover"
            />
            <h1 className="text-white font-semibold text-lg tracking-tight">
              Crypto Insight
            </h1>
          </div>

          {/* Right: Menu button (mobile) */}
          <div className="flex items-center gap-4">
            {/* You can later add theme toggler, profile, notifications, etc. */}
            <IconButton
              className="text-gray-400 hover:text-white lg:hidden"
              size="small"
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
