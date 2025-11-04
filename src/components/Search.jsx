import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className="w-full sm:w-80 md:w-96 lg:w-md transition-all">
      <TextField
        id="fullWidth"
        fullWidth
        placeholder="Search any coin..."
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#ffffff",
            backgroundColor: "rgba(17, 24, 39, 0.9)", // gray-950
            height: 45,
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            "& fieldset": { borderColor: "#ffffff" },
            "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
            "&.Mui-focused fieldset": { borderColor: "#22c55e" }, // emerald-500
          },
          "& input::placeholder": {
            color: "#d1d5db", // gray-400
            opacity: 0.8,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#d1d5db" }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
