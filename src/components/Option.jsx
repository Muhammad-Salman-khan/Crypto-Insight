import { FormControl, MenuItem, Select } from "@mui/material";

const Option = () => {
  return (
    <FormControl
      size="small"
      className="min-w-[150px] bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
    >
      <Select
        labelId="filter-select-label"
        id="filter-select"
        label="Filter Search"
        className="text-sm dark:text-gray-200"
        sx={{
          color: "inherit",
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="gainers">Top Gainers</MenuItem>
        <MenuItem value="losers">Top Losers</MenuItem>
        <MenuItem value="volume">High Volume</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Option;
